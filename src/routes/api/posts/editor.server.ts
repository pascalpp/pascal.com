import { env } from '$env/dynamic/private';
import { spawn } from 'child_process';
import File from 'fs';
import Path from 'path';

const DEFAULT_EDITOR = 'code';
const EXTRA_PATHS = ['/usr/local/bin', '/opt/homebrew/bin', '/usr/bin', '/bin', '/usr/sbin', '/sbin'];

function parseEnvValue(value: string) {
  const trimmed = value.trim();
  const quote = trimmed[0];

  if ((quote === '"' || quote === "'") && trimmed.endsWith(quote)) {
    return trimmed.slice(1, -1);
  }

  return trimmed.replace(/\s+#.*$/, '').trim();
}

function readLocalEditor() {
  try {
    const envFile = File.readFileSync(Path.resolve(process.cwd(), '.env'), 'utf8');
    const line = envFile.split(/\r?\n/).find(line => /^\s*(?:export\s+)?EDITOR\s*=/.test(line));

    if (!line) return undefined;

    const [, value = ''] = line.split(/=(.*)/s);
    return parseEnvValue(value);
  } catch {
    return undefined;
  }
}

function splitEditorValue(value: string) {
  return value.match(/(?:[^\s"']+|"[^"]*"|'[^']*')+/g)?.map(part => part.replace(/^(['"])(.*)\1$/, '$2')) ?? [];
}

function getEditorCommand() {
  const value = (readLocalEditor() || env.EDITOR || DEFAULT_EDITOR).trim();
  const [command = DEFAULT_EDITOR, ...args] = splitEditorValue(value);
  return { command, args };
}

function getEditorEnv() {
  const path = [...EXTRA_PATHS, process.env.PATH ?? '']
    .flatMap(path => path.split(':'))
    .filter(Boolean)
    .filter((path, index, paths) => paths.indexOf(path) === index)
    .join(':');

  return {
    ...process.env,
    PATH: path,
  };
}

export async function openInEditor(paths: string[]) {
  const { command, args } = getEditorCommand();

  await new Promise<void>((resolve, reject) => {
    const child = spawn(command, [...args, ...paths], {
      detached: true,
      env: getEditorEnv(),
      stdio: 'ignore',
    });

    child.once('error', reject);
    child.once('spawn', () => {
      child.unref();
      resolve();
    });
  });
}

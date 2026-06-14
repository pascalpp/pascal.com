import { env } from '$env/dynamic/private';
import { execFile } from 'child_process';

const DEFAULT_EDITOR = 'code';

function getEditorCommand() {
  const value = (env.EDITOR || DEFAULT_EDITOR).trim();
  const [command = DEFAULT_EDITOR, ...args] = value.split(/\s+/);
  return { command, args };
}

export function openInEditor(paths: string[]) {
  const { command, args } = getEditorCommand();

  execFile(command, [...args, ...paths], error => {
    if (error) {
      console.error(error);
    }
  });
}

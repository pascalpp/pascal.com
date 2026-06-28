import { redirect } from '@sveltejs/kit';

export function GET() {
  throw redirect(308, '/hellomynameis/tourdates.html');
}

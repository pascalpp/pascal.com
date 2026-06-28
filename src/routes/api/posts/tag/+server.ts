export async function GET() {
	return Response.json([], { headers: { 'content-type': 'application/json; charset=utf-8' } });
}

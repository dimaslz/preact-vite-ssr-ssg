import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const run = async () => {
	const __dirname = path.dirname(fileURLToPath(import.meta.url));
	const toAbsolute = (p) => path.resolve(__dirname, p);

	const template = fs.readFileSync(toAbsolute('dist/client/index.html'), 'utf-8');
	const render = (await import('./dist/server/entry-server.js')).SSRRender;

	if (!fs.existsSync(toAbsolute("dist/client/pages"))) {
		fs.mkdirSync(toAbsolute("dist/client/pages"));
	}
	// determine routes to pre-render from src/pages
	const routesToPrerender = fs.readdirSync(toAbsolute('src/pages'))
		.filter((file) => /.*?\.tsx$/.test(file))
		.map((file) => {
		const name = file.replace(/\.tsx$/, '').toLowerCase();
		return name === 'home' ? `/` : `/${name}`;
	});

	(async () => {
		// pre-render each route...
		for (const url of routesToPrerender) {
			const appHtml = render({ path: url });

			const html = template.replace(`<!--ssr-outlet-->`, appHtml);

			const filePath = `dist/client/pages${url === '/' ? '/index' : url}.html`;
			fs.writeFileSync(toAbsolute(filePath), html);
		}
	})();
}

run()
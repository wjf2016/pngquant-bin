import fs from 'node:fs';
import process from 'node:process';
import {fileURLToPath} from 'node:url';
import BinWrapper from 'bin-wrapper';

const pkg = JSON.parse(fs.readFileSync(new URL('../package.json', import.meta.url)));
const site = process.env.PNGQUANT_BINARY_SITE ||
            process.env.npm_config_pngquant_binary_site ||
            'https://raw.githubusercontent.com';

const url = `${site}/imagemin/pngquant-bin/v${pkg.version}/vendor/`;r/`;

const binWrapper = new BinWrapper()
	.src(`${url}macos/pngquant`, 'darwin')
	.src(`${url}linux/x86/pngquant`, 'linux', 'x86')
	.src(`${url}linux/x64/pngquant`, 'linux', 'x64')
	.src(`${url}freebsd/x64/pngquant`, 'freebsd', 'x64')
	.src(`${url}win/pngquant.exe`, 'win32')
	.dest(fileURLToPath(new URL('../vendor', import.meta.url)))
	.use(process.platform === 'win32' ? 'pngquant.exe' : 'pngquant');

export default binWrapper;

import type { FeedEntry } from './app/types/feed'

const basicConfig = {
	title: '液泡部落格',
	subtitle: '一介书生，三尺微命',
	// 长 description 利好于 SEO
	description: '液泡(Dinosaur)的个人博客，这里有技术分享与液泡对生活的思考，充满启发与思考。网站界面简洁美观，内容丰富实用，人气互动活跃，涵盖了编程、生活、学习等多个领域，为读者提供了卓越的阅读体验。',
	author: {
		name: 'VacuolePao',
		avatar: 'https://dinoimg.236668.xyz/file/1771316681372_avatar.png',
		email: 'me@vacu.top',
		homepage: 'https://www.vacu.top/',
	},
	copyright: {
		abbr: 'CC BY-NC-SA 4.0',
		name: '署名-非商业性使用-相同方式共享 4.0 国际',
		url: 'https://creativecommons.org/licenses/by-nc-sa/4.0/deed.zh-hans',
	},
	favicon: 'https://oss2.236668.xyz/favicon.ico',
	language: 'zh-CN',
	timeEstablished: '2025-07-19',
	timeZone: 'Asia/Shanghai',
	url: 'https://blog.vacu.top/',
	defaultCategory: '未分类',
}

// 存储 nuxt.config 和 app.config 共用的配置
// 此处为启动时需要的配置，启动后可变配置位于 app/app.config.ts
// @keep-sorted
const blogConfig = {
	...basicConfig,

	article: {
		categories: {
			[basicConfig.defaultCategory]: { icon: 'tabler:circle-dashed' },
			/** 实践可复用操作经验：工具/系统/部署/排障 */
			技术: { icon: 'tabler:mouse', color: '#33aaff' },
			/** 编程：代码实现/工程实践/开发方法 */
			开发: { icon: 'tabler:code', color: '#7777ff' },
			/** 思考：观点讨论/复盘反思/行业或产品观察 */
			思考: { icon: 'tabler:message', color: '#33bbaa' },
			/** 记录叙事：个人经历/校园家庭/日常片段 */
			生活: { icon: 'tabler:leaf', color: '#ff7777' },
		},
		/** 文章版式，首个为默认版式 */
		types: {
			tech: {},
			story: {},
		},
		/** 分类排序方式，键为排序字段，值为显示名称 */
		order: {
			date: '创建日期',
			updated: '更新日期',
			// title: '标题',
		},
		/** 使用 pnpm new 新建文章时自动生成自定义链接（permalink/abbrlink） */
		useRandomPremalink: true,
		/** 隐藏基于文件路由（不是自定义链接）的 URL /post 路径前缀 */
		hidePostPrefix: true,
		/** 禁止搜索引擎收录的路径 */
		robotsNotIndex: ['/preview', '/previews/*'],
	},

	/** 博客 Atom 订阅源 */
	feed: {
		/** 订阅源最大文章数量 */
		limit: 50,
		/** 订阅源是否启用XSLT样式 */
		enableStyle: true,
	},

	/** 向 <head> 中添加脚本 */
	scripts: [
		// 自己部署的 Umami 统计服务
		{ 'src': 'https://umami.api.236668.xyz/script.js', 'data-website-id': '5a21135c-38ce-4a34-8636-b38d20634a8f', 'defer': true },
		// Twikoo 评论系统
		{ src: 'https://registry.npmmirror.com/twikoo/1.7.13/files/dist/twikoo.min.js', defer: true },
	],

	/** 全站统计配置 */
	stats: {
		/** 全站文章字数统计排除的文件，按 content 目录下的文件匹配，支持 * 和 ** 通配符 */
		excludeFiles: ['link.md', 'theme.md', 'previews/**'],
	},

	/** 自己部署的 Twikoo 服务 */
	twikoo: {
		envId: 'https://vacuoletwikoo.netlify.app/.netlify/functions/twikoo',
		preload: 'https://vacuoletwikoo.netlify.app/.netlify/functions/twikoo',
	},
}

/** 用于生成 OPML 和友链页面配置 */
export const myFeed: FeedEntry = {
	author: blogConfig.author.name,
	sitenick: '部落格',
	title: blogConfig.title,
	desc: blogConfig.subtitle || blogConfig.description,
	link: blogConfig.url,
	feed: new URL('/atom.xml', blogConfig.url).toString(),
	icon: blogConfig.favicon,
	avatar: blogConfig.author.avatar,
	archs: ['Nuxt', 'Vercel'],
	date: blogConfig.timeEstablished,
	comment: '这是我自己',
}

export default blogConfig

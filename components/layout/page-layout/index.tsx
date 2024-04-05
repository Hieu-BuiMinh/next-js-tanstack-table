import React from 'react'

interface IPageLayout {
	children: React.ReactNode
	meta: { title: string }
}

function PageLayout({ children, meta }: Readonly<IPageLayout>) {
	return (
		<>
			<div className='h-[80px] border p-2'>{meta.title}</div>
			<div className="flex">
				<div className="w-[180px] p-2 h-[calc(100vh-80px)] flex-shrink-0 border-r">side-bar</div>
				<div className="flex-1 overflow-hidden p-3">{children}</div>
			</div>
		</>
	)
}

export default PageLayout

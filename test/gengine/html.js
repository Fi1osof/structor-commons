var HtmlComponents = {
	'input': {
		props: {
			type: 'text',
			placeholder: 'Enter value'
		}
	},
	'label': {
		text: 'Label Text'
	},
	'fieldset': {
		children: [
			{type: 'span', text: 'Empty fieldset'},
		]
	},
	'button': {
		children: [
			{type: 'span', text: 'Button'}
		]
	},
	'h1':  {
		children: [
			{type: 'span', text: 'Empty h1'}
		]
	},
	'h2': {
		children: [
			{type: 'span', text: 'Empty h2'}
		]
	},
	'h3': {
		children: [
			{type: 'span', text: 'Empty h3'}
		]
	},
	'h4': {
		children: [
			{type: 'span', text: 'Empty h4'}
		]
	},
	'h5': {
		children: [
			{type: 'span', text: 'Empty h5'}
		]
	},
	'span': {
		text: 'Text'
	},
	'strong': {
		text: 'Strong text'
	},
	'small': {
		text: 'Small text'
	},
	'em': {
		text: 'Text with emphasis'
	},
	'i': {
		props: {
			className: 'fa fa-star'
		}
	},
	'div': {
		children: [
			{type: 'span', text: 'Empty div'}
		]
	},
	'p': {
		children: [
			{type: 'span', text: 'Empty p'}
		]
	},
	'path': {
		props: {
			d: 'M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z'
		}
	},
	'blockquote': {
		children: [
			{type: 'p', children: [
				{type: 'span', text: 'This is a quotation'}
			]}
		]
	},
	'hr': {},
	'a': {
		props: {
			href: "#"
		},
		children: [
			{type: 'span', text: 'Link text'}
		]
	},
	'select': {
		children: [
			{type: 'option', text: 'option #1'},
			{type: 'option', text: 'option #2'},
			{type: 'option', text: 'option #3'},
			{type: 'option', text: 'option #4'},
			{type: 'option', text: 'option #5'}
		]
	},
	'option': {
		text: 'select option'
	},
	'img': {
		props: {
			src: 'http://lorempixel.com/600/337/nature/'
		}
	},
	'form': {
		children: [
			{type: 'span', text: 'Empty form'}
		]
	},
	'table': {
		children: [
			{type: 'thead',
				children: [
					{
						type: 'tr',
						children: [
							{
								type: 'th',
								children: [
									{type: 'span', text: 'Text in th'}
								]
							},
							{
								type: 'th',
								children: [
									{type: 'span', text: 'Text in th'}
								]
							},
							{
								type: 'th',
								children: [
									{type: 'span', text: 'Text in th'}
								]
							},
							{
								type: 'th',
								children: [
									{type: 'span', text: 'Text in th'}
								]
							}
						]
					}
				]
			},
			{type: 'tbody',
				children: [
					{
						type: 'tr',
						children: [
							{
								type: 'td',
								children: [
									{type: 'span', text: 'Text in td'}
								]
							},
							{
								type: 'td',
								children: [
									{type: 'span', text: 'Text in td'}
								]
							},
							{
								type: 'td',
								children: [
									{type: 'span', text: 'Text in td'}
								]
							},
							{
								type: 'td',
								children: [
									{type: 'span', text: 'Text in td'}
								]
							}
						]
					},
					{
						type: 'tr',
						children: [
							{
								type: 'td',
								children: [
									{type: 'span', text: 'Text in td'}
								]
							},
							{
								type: 'td',
								children: [
									{type: 'span', text: 'Text in td'}
								]
							},
							{
								type: 'td',
								children: [
									{type: 'span', text: 'Text in td'}
								]
							},
							{
								type: 'td',
								children: [
									{type: 'span', text: 'Text in td'}
								]
							}
						]
					}
				]
			}
		]
	},
	'thead': {
		children: [
			{
				type: 'tr',
				children: [
					{
						type: 'th',
						children: [
							{type: 'span', text: 'Text in th'}
						]
					}
				]
			}
		]
	},
	'tbody': {
		children: [
			{
				type: 'tr',
				children: [
					{
						type: 'td',
						children: [
							{type: 'span', text: 'Text in td'}
						]
					}
				]
			}
		]
	},
	'tr': {
		children: [
			{
				type: 'td',
				children: [
					{type: 'span', text: 'Text in td'}
				]
			}
		]
	},
	'td': {
		children: [
			{type: 'span', text: 'Text in td'}
		]
	},
	'th': {
		children: [
			{type: 'span', text: 'Text in th'}
		]
	},
	'ol': {
		children: [
			{type: 'li', children: [
				{type: 'span', text: 'First Item'}
			]},
			{type: 'li', children: [
				{type: 'span', text: 'Second Item'}
			]},
			{type: 'li', children: [
				{type: 'span', text: 'Third Item'}
			]}
		]
	},
	'ul': {
		children: [
			{type: 'li', children: [
				{type: 'span', text: 'First Item'}
			]},
			{type: 'li', children: [
				{type: 'span', text: 'Second Item'}
			]},
			{type: 'li', children: [
				{type: 'span', text: 'Third Item'}
			]}
		]
	},
	'li': {
		children: [
			{type: 'span', text: 'List Item'}
		]
	},
	'dl': {
		children: [
			{type: 'dt', children: [
				{type: 'span', text: 'Main text'}
			]},
			{type: 'dd', children: [
				{type: 'span', text: 'Description text line'}
			]},
			{type: 'dt', children: [
				{type: 'span', text: 'Main text'}
			]},
			{type: 'dd', children: [
				{type: 'span', text: 'Description text line'}
			]}
		]
	},
	'dt': {
		children: [
			{type: 'span', text: 'Main text'}
		]
	},
	'dd': {
		children: [
			{type: 'span', text: 'Description text line'}
		]
	},
	'pre': {
		children: [
			{type: 'span', text: 'Preformatted text line'}
		]
	},
	'code': {
		children: [
			{type: 'span', text: 'Code text line'}
		]
	},
	'header': {
		children: [
			{type: 'p', children: [
				{type: 'span', text: 'Header'}
			]}
		]
	},
	'main': {
		children: [
			{type: 'p', children: [
				{type: 'span', text: 'Main'}
			]}
		]
	},
	'article': {
		children: [
			{type: 'p', children: [
				{type: 'span', text: 'Article'}
			]}
		]
	},
	'nav': {
		children: [
			{type: 'p', children: [
				{type: 'span', text: 'Navigation'}
			]}
		]
	},
	'aside': {
		children: [
			{type: 'p', children: [
				{type: 'span', text: 'Aside'}
			]}
		]
	},
	'footer': {
		children: [
			{type: 'p', children: [
				{type: 'span', text: 'Footer'}
			]}
		]
	}
};

module.exports = HtmlComponents;

let a = [
	{
		key: '1',
		value: 'rig_meta_db',
		children: [
			{ key: '1-1', value: 'table_01' },
			{ key: '1-2', value: 'table_02' },
			{ key: '1-3', value: 'table_03' },
			{ key: '1-4', value: 'table_04' },
			{ key: '1-5', value: 'table_05' },
			{ key: '1-6', value: 'table_06' },
			{ key: '1-7', value: 'table_07' },
			{ key: '1-8', value: 'table_08' },
		],
	},
	{
		key: '2',
		value: 'rig_msv_db',
		children: [
			{ key: '2-1', value: 'table_01' },
			{ key: '2-2', value: 'table_02' },
			{ key: '2-3', value: 'table_03' },
			{ key: '2-4', value: 'table_04' },
			{ key: '2-5', value: 'table_05' },
			{ key: '2-6', value: 'table_06' },
			{ key: '2-7', value: 'table_07' },
			{ key: '2-8', value: 'table_08' },
		],
	},
]

let b = [
	{
		key: '1',
		value: 'rig_meta_db',
		children: [
			{ key: '1-1', value: 'table_01' },
			{ key: '1-2', value: 'table_02' },
			{ key: '1-3', value: 'table_03' },
			{ key: '1-4', value: 'table_04' },
			{ key: '1-7', value: 'table_07' },
			{ key: '1-8', value: 'table_08' },
		],
	},
]

// 需求是：要将b中在a中存在的元素都要剔除，得到新的数组

function filterAB(a, b) {
	return a.map((item) => {
		const { key, value, children } = item
		let tem = {
			key: key,
			value: value,
			children: children,
		}
		let unique = false //b中是否有对应筛选项
		let indexB = 0 //当前id在b中位置
		b.forEach((tmp, index) => {
			if (tmp.key === key) {
				unique = true
				indexB = index
			}
		})
		if (!unique) {
			return tem
		}
		let childrenTem = []
		children.forEach((child) => {
			let contain = false // 是否包含
			b[indexB].children.forEach((filtChild) => {
				child.key == filtChild.key && (contain = true)
			})
			!contain && childrenTem.push(child)
		})
		tem.children = childrenTem
		return tem
	})
}

let c = filterAB(a, b)
console.log('c', JSON.stringify(c))

let d = ['1-1', '1-2', '1-3', '1-4', '1-5', '1-6', '1-7', '1-8', '2-3']

const deal = (target, deleteKeys) => {
	const result = {}

	const dealChild = (source = [], parent, target = []) => {
		parent.children = []

		source.forEach((item) => {
			const { key, value, children } = item
			const newParent = {
				key,
				value,
			}
			if (Array.isArray(children) && children.length) {
				newParent.children = children.filter(
					(item) => target.indexOf(item.key) < 0
				)
				parent.children.push(newParent)
				dealChild(newParent.children || children, newParent, target)
			} else {
				parent.children.push(item)
			}
		})
	}

	dealChild(target, result, deleteKeys)

	return result.children
}

let m = deal(a, d)
console.log(JSON.stringify(m))

// 最终得到的结果是：
// [
// 	{ key: '1', value: 'rig_meta_db', children: [] },
// 	{
// 		key: '2',
// 		value: 'rig_msv_db',
// 		children: [
// 			{ key: '2-1', value: 'table_01' },
// 			{ key: '2-2', value: 'table_02' },
// 			{ key: '2-4', value: 'table_04' },
// 			{ key: '2-5', value: 'table_05' },
// 			{ key: '2-6', value: 'table_06' },
// 			{ key: '2-7', value: 'table_07' },
// 			{ key: '2-8', value: 'table_08' },
// 		],
// 	},
// ]

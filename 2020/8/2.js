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
	'1-2',
	'1-3',
	'1-4',
	'1-5',
	'1-6',
	'1-7',
	'1-8',
	'2-1',
	'2-2',
	'2-3',
	'2-4',
	'2-5',
    '2-6',
    '2-7',
]
// 将对应的子级删除，得到1-1所对应的对象

const deal = (target, deleteKeys) => {
    const result = {};
  
    const dealChild = (source = [], parent, target = []) => {
      parent.children = [];
  
      source.forEach((item) => {
        const {
          key,
          value,
          children
        } = item;
        const newParent = {
          key,
          value,
        };
        if (!target.includes(key)) {
          if (Array.isArray(children) && children.length) {
            newParent.children = children.filter(
              (item) => target.indexOf(item.key) < 0
            );
            parent.children.push(newParent);
            dealChild(newParent.children || children, newParent, target);
          } else {
            parent.children.push(item);
          }
        }
      });
    };
  
    dealChild(target, result, deleteKeys);
  
    return result.children.filter(item => item.children.length);
  };
  
  console.log(JSON.stringify(deal(a, b)))


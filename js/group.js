// 分组
groupBy(array, f) {
    const groups = {};
    array.forEach(function (o) {
        o.date = new Date(o.time).getDate() + "日 " + new Date(o.time).format('HH:mm')
        const group = JSON.stringify(f(o));
        groups[group] = groups[group] || [];
        groups[group].push(o);
    });
    return Object.keys(groups).map(function (group) {
        return {
            group: group,
            data: groups[group]
        };
    });
},
import { Graph, Cell, Node, Path } from '@antv/x6'
import { Keyboard } from '@antv/x6-plugin-keyboard'
import { Selection } from '@antv/x6-plugin-selection'
import Hierarchy from '@antv/hierarchy'
import insertCss from 'insert-css'
const StyleRow = {
    width: 284,
    height: 238
}

export const initX6 = () => {
    // 中心主题或分支主题
    Graph.registerNode(
        'topic',
        {
            inherit: 'rect',
            markup: [
                {
                    tagName: 'rect',
                    selector: 'body',
                },
                {
                    tagName: 'rect',
                    selector: 'bg',
                },
                {
                    tagName: 'image',
                    selector: 'img',
                },
                {
                    tagName: 'text',
                    selector: 'label',
                },
            ],
            attrs: {
                body: {
                    fill: '#ffffff',
                    strokeWidth: 2, // 设置边框宽度
                    stroke: '#0087D3', // 设置边框颜色为蓝色
                    rx: 5, // 圆角矩形
                    ry: 5, // 圆角矩形
                    fill: '#0087D3',
                },
                label: {
                    fontSize: 18,
                    fill: '#ffffff',
                    // textVerticalAnchor: 'left',
                    textAnchor: 'left',
                    textVerticalAnchor: 'top',
                    x: 20,
                    y: 15,
                    refX: 3,
                    refY: 2,
                    // refY: 50, // 设置文本垂直位置
                    //textAnchor: 'left', // 设置文本水平居中
                    // refX: '30%',
                    // refY2: -25,
                },
                bg: {
                    stroke: '#0087D3', // 设置边框颜色为蓝色
                    width: StyleRow.width - 20, // 圆角矩形
                    height: StyleRow.height - 60, // 圆角矩形
                    stroke: '#ffffff',
                    x: 10, // 调整图片位置，使其居中
                    y: 50, // 调整图片位置，使其居中
                },
                image: {

                    width: StyleRow.width - 40, // 图片宽度
                    height: StyleRow.height - 20, // 图片高度
                    fill: '#ffffff',
                    preserveAspectRatio: 'xMidYMid meet', // 保持宽高比
                    x: 20, // 调整图片位置，使其居中
                    y: 30, // 调整图片位置，使其居中
                },
            },
        },
        true,
    )

    // 子主题
    Graph.registerNode(
        'topic-child',
        {
            inherit: 'rect',
            markup: [
                {
                    tagName: 'rect',
                    selector: 'body',
                },
                {
                    tagName: 'text',
                    selector: 'label',
                },
                {
                    tagName: 'image',
                    selector: 'image',
                },
            ],
            attrs: {
                body: {
                    fill: '#ffffff',
                    strokeWidth: 2, // 设置边框宽度
                    stroke: '#5F95FF', // 设置边框颜色为蓝色
                    rx: 10, // 圆角矩形
                    ry: 10, // 圆角矩形
                },
                label: {
                    fontSize: 14,
                    fill: '#262626',
                    textVerticalAnchor: 'middle',
                    refY: 30, // 设置文本垂直位置
                    textAnchor: 'middle', // 设置文本水平居中
                    // refX: '50%',
                    // refY2: -25,
                },
                image: {

                    width: 60, // 图片宽度
                    height: 60, // 图片高度
                    refX: '50%',
                    refY: '50%',
                    x: -30, // 调整图片位置，使其居中
                    y: -30, // 调整图片位置，使其居中
                },
            },
        },
        true,
    )
    // 连接器
    Graph.registerConnector(
        'mindmap',
        (sourcePoint, targetPoint, routerPoints, options) => {
            const midX = sourcePoint.x + 10
            const midY = sourcePoint.y
            const ctrX = (targetPoint.x - midX) / 5 + midX
            const ctrY = targetPoint.y
            const pathData = `
       M ${sourcePoint.x} ${sourcePoint.y}
       L ${midX} ${midY}
       Q ${ctrX} ${ctrY} ${targetPoint.x} ${targetPoint.y}
      `
            return options.raw ? Path.parse(pathData) : pathData
        },
        true,
    )

    // 边
    Graph.registerEdge(
        'mindmap-edge',
        {
            inherit: 'edge',
            connector: {
                name: 'mindmap',
            },
            attrs: {
                line: {
                    targetMarker: '',
                    stroke: '#A2B1C3',
                    strokeWidth: 2,
                },
            },
            zIndex: 0,
        },
        true,
    )

    const male =
        'https://gw.alipayobjects.com/mdn/rms_43231b/afts/img/A*kUy8SrEDp6YAAAAAAAAAAAAAARQnAQ'

    const data = {
        id: '1',
        type: 'topic',
        label: '设备概述页面',
        image: '/images/help/设备类型概览.png',
        ...StyleRow,
        children: [
            {
                id: '1-1',
                type: 'topic-branch',
                label: '振动分析与异常检测',
                avatar: {
                    opacity: 0.7,
                    'xlink:href': male,
                },
                image: '/images/help/振动分析与异常检测.png',
                ...StyleRow
            },
            {
                id: '1-2',
                type: 'topic-branch',
                label: '失速预测与分析',
                image: '/images/help/失速预测与分析.png',
                ...StyleRow
            },
            {
                id: '1-3',
                label: '预防性维护',
                image: '/images/help/预防性维护.png',
                type: 'topic-branch',
                ...StyleRow
            },
            {
                id: '1-4',
                label: '单设备概述',
                image: '/images/help/单设备概述.png',
                type: 'topic-branch',
                ...StyleRow
            },
            {
                id: '1-5',
                label: '可用性分析',
                type: 'topic-branch',
                image: '/images/help/可用性分析.png',
                ...StyleRow
            },
            {
                id: '1-6',
                label: '能耗分析',
                type: 'topic-branch',
                image: '/images/help/能耗分析.png',
                ...StyleRow
            },
            // {
            //     id: '1-7',
            //     label: '报告分析与集成',
            //     image: '/images/help/报告分析.png',
            //     type: 'topic-branch',
            //     ...StyleRow
            // },
        ],
    }

    const graph = new Graph({
        container: document.getElementById('helpV6'),
        connecting: {
            connectionPoint: 'anchor',
        },
        panning: {
            enabled: true,
            eventTypes: ['leftMouseDown', 'mouseWheel'],
        },
        mousewheel: {
            enabled: true,
            modifiers: 'ctrl',
            factor: 1.1,
            maxScale: 1.5,
            minScale: 0.5,
        },
    })
    graph.use(
        new Selection({
            multiple: true,
            rubberEdge: true,
            rubberNode: true,
            modifiers: 'shift',
            rubberband: true,
        }),
    )
    graph.use(new Selection())
    graph.use(new Keyboard())



    const render = () => {
        const result = Hierarchy.mindmap(data, {
            direction: 'H',
            getHeight(d) {
                return d.height
            },
            getWidth(d) {
                return d.width
            },
            getHGap() {
                return 20
            },
            getVGap() {
                return 20
            },
            getSide: () => {
                return 'right'
            },
        })
        const cells = []
        const traverse = (hierarchyItem) => {
            if (hierarchyItem) {
                const { data, children } = hierarchyItem
                cells.push(
                    graph.createNode({
                        id: data.id,
                        shape: data.type === 'topic-child' ? 'topic-child' : 'topic',
                        x: hierarchyItem.x,
                        y: hierarchyItem.y,
                        width: data.width,
                        height: data.height,
                        label: data.label,
                        type: data.type,
                        attrs: {
                            image: {
                                'xlink:href': data.image, // 动态设置图片路径
                            },
                        }
                    }),
                )
                if (children) {
                    children.forEach((item) => {
                        const { id, data } = item
                        cells.push(
                            graph.createEdge({
                                shape: 'mindmap-edge',
                                source: {
                                    cell: hierarchyItem.id,
                                    anchor:
                                        data.type === 'topic-child'
                                            ? {
                                                name: 'right',
                                                args: {
                                                    dx: -16,
                                                },
                                            }
                                            : {
                                                name: 'center',
                                                args: {
                                                    dx: '25%',
                                                },
                                            },
                                },
                                target: {
                                    cell: id,
                                    anchor: {
                                        name: 'left',
                                    },
                                },
                            }),
                        )
                        traverse(item)
                    })
                }
            }
        }
        traverse(result)
        graph.resetCells(cells)
        graph.centerContent()
    }

    const findItem = (
        obj,
        id,
    ) => {
        if (obj.id === id) {
            return {
                parent: null,
                node: obj,
            }
        }
        const { children } = obj
        if (children) {
            for (let i = 0, len = children.length; i < len; i += 1) {
                const res = findItem(children[i], id)
                if (res) {
                    return {
                        parent: res.parent || obj,
                        node: res.node,
                    }
                }
            }
        }
        return null
    }




    render()

    //     insertCss(`
    //     .topic-image {
    //       visibility: hidden;
    //       cursor: pointer;
    //     }
    //     .x6-node:hover .topic-image {
    //       visibility: visible;
    //     }
    //     .x6-node-selected rect {
    //       stroke-width: 2px;
    //     }
    //   `)

}
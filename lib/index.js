import { Component } from "react"
import extend from "extend"
import util from "util.react"
import spreadProps from "react-spread-props"
require('./index.css')
const TreeLogic = require('tree-logic/lib/index')
const TreeLogicMap = require('tree-logic/lib/map')
class Selector extends Component {
    constructor (props) {
        super(props)
        const self = this
        this.state = {}
        self.tree = new TreeLogic({
            getData() {
                return TreeLogicMap(self.props.options, 'children', function (item, index, currentArray) {
                    item.id = item.value
                    return item
                })
            },
            extendParent: {
                check : true ,
                checkUntilAll : false , // check : true 才需要此参数 (选中item的条件:其下直接子元素都被选中)
                uncheck : true ,
                uncheckUntilLast : true // uncheck : true 才需要此参数 (取消item条件:其下直系子元素都没有被选中)
            },
            extendChild: {
                check : true,
                uncheck : true ,
            },
            getChecked () {
                return self.props.value
            },
            judgeChild: 'children',
            multiple: true,
            onToggleCheck: function (checkeds) {
                self.emitChange(checkeds)
            }
        })
    }
    emitChange = (checkeds) => {
        const self = this
        self.props.onChange(checkeds)
    }
    toggleCheckbox = (value) => {
        const self = this
        return function () {
            self.tree.toggleCheck(value)
        }
    }
    render() {
        const self = this
        const ref = util.ref(self)
        let rootClassName = [
            self.props.prefixClassName,
            util.themes(self.props),
        ].join(' ')
        let domProps = spreadProps(
           self.props,
           {
               className: rootClassName,
           },
           {
               ignore: 'onChange'
           }
        )
        return (
            <div
                ref={ref`root`}
               {...domProps}
            >
                {
                    self.props.options.map(function (item, index) {
                        return (
                            <div className="face-selector-item" key={item.value}>
                                <label className="face-selector-item-label face-selector-item-label--check-all">
                                    <input type="checkbox" onChange={self.toggleCheckbox(item.value)} checked={self.props.value.includes(item.value)}  className="face-selector-item-label-input" />
                                    <span className="face-selector-item-label-text">{item.label}</span>
                                </label>
                                {
                                    Array.isArray(item.children)?
                                    item.children.map(function (subItem) {
                                        let controlNode = [
                                            (<input checked={self.props.value.includes(subItem.value)}  onChange={self.toggleCheckbox(subItem.value)}  type="checkbox" className="face-selector-item-label-input" key="a" />),
                                            <span className="face-selector-item-label-text" key="b" >{subItem.label}</span>
                                        ]
                                        let controlProps = {
                                            className: 'face-selector-item-label',
                                            key: subItem.value
                                        }
                                        if (Array.isArray(subItem.children)) {
                                            return (
                                                <div {...controlProps} className="face-selector-item-label face-selector-item-label--has-children">
                                                    <label className="face-selector-item-label-target">
                                                        {controlNode}
                                                    </label>
                                                    {/*
                                                        <span className="face-selector-item-label-stats">
                                                            <span className="face-selector-item-label-stats-checked">3</span><span className="face-selector-item-label-stats-split">/</span><span className="face-selector-item-label-stats-total">11</span>
                                                        </span>
                                                    */}
                                                    <span className="face-selector-item-label-children">
                                                        {
                                                            subItem.children.map(function (grandsonItem) {
                                                                return (
                                                                    <label key={'key' + grandsonItem.value} className="face-selector-item-label-children-label">
                                                                        <input checked={self.props.value.includes(grandsonItem.value)}  onChange={self.toggleCheckbox(grandsonItem.value)} type="checkbox" className="face-selector-item-label-children-label-input" />
                                                                        <span className="face-selector-item-label-children-label-input-text">{grandsonItem.label}</span>
                                                                    </label>
                                                                )
                                                            })
                                                        }
                                                    </span>
                                                </div>
                                            )
                                        }
                                        else {
                                            return (
                                                <label {...controlProps} >
                                                    {controlNode}
                                                </label>
                                            )
                                        }
                                    })
                                    :false
                                }
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}
require('./props').default(Selector)
export default Selector
module.exports = Selector

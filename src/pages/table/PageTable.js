require('./PageTable.less');

const reactMixin = require('react-mixin');

const i18n = require('i18n');

const Actions = require('./actions');
const Store = require('./store');

const {Table} = Uxcore;

class PageTable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount() {
        Actions.fetch({}, function(data) {
            console.log(data);
        });
    }

    render() {
        let columns = [
            // 开启内置排序功能
            { dataKey: 'title', title: '标题', width: 200, ordered: true},
            { dataKey: 'money', title: '金额', width: 200, type: 'money', delimiter: ","},
            // 通过 render 方法来自定义 Cell 的渲染
            { dataKey: 'agent', title: "金融机构", width: 200, render: function(cellData, rowData) {
                return <span>{`${cellData}(${rowData.money})`}</span>
            }},  
            { dataKey: 'person', title: "申请人", width: 150},
            { dataKey: 'date',title: "日期", width: 150} 
        ];

        let tableProps = {
            jsxcolumns: columns,
            pageSize: 5,
            showSearch: true,
            fetchUrl: "http://eternalsky.me:8122/file/getDemo.jsonp"
        }
        return (
            <div className="table">
                <h1>Table Demo</h1>
                <Table {...tableProps}/>
            </div>
        );
    }

    componentWillMount() {
    }

    componentWillReceiveProps(nextProps) {
    }

    shouldComponentUpdate(nextProps, nextState) {
        return true;
    }

    componentWillUpdate(nextProps, nextState) {
    }

    componentDidUpdate(prevProps, prevState) {
    }

    componentWillUnmount() {
    }
}

reactMixin.onClass(PageTable, Reflux.connect(Store));

ReactDOM.render(<PageTable/>, document.getElementById('App'));

module.exports = PageTable;

require('./PageDemo.less');

const reactMixin = require('react-mixin');

const i18n = require('i18n');

const Actions = require('./actions');
const Store = require('./store');

const { Table } = Uxcore;

class PageDemo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            content: {},
            error: false
        };
    }

    componentDidMount() {
        Actions.fetch({
            workNo: '0001'
        }, function(data) {
            console.log(data);
        });
    }

    render() {
        let renderCell = (cellData, rowData) => {
            return <span>{cellData}</span>
        };
        let tableProps = {
            width: 900,
            jsxdata: {
                data: this.state.content.list
            },
            jsxcolumns: [
                {dataKey: 'workNo', title: '工号', width: 300, render: renderCell},
                {dataKey: 'name', title: '姓名', width: 300, render: renderCell},
                {dataKey: 'nickName', title: '昵称', width: 300, render: renderCell}
            ]
        };
        return (
            <div className="page-demo">
                <h1>UXCore Starter Kit</h1>
                <Table {...tableProps} />
                <h1>{i18n('i18n')}</h1>
                <p>{i18n('changeServer')}</p>
                <h1>DOCS</h1>
                <ul>
                    <li>UXCore: <a href="http://uxco.re">http://uxco.re</a></li>
                    <li>Nowa: <a href="http://nowa-webpack.github.io/web/index.html?en">http://nowa-webpack.github.io</a></li>
                </ul>
            </div>
        );
    }
}

reactMixin.onClass(PageDemo, Reflux.connect(Store));

ReactDOM.render(<PageDemo/>, document.getElementById('App'));

module.exports = PageDemo;

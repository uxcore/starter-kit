require('./PageDemo.less');

const reactMixin = require('react-mixin');

const i18n = require('i18n');

const Actions = require('./actions');
const Store = require('./store');


// component can be imported in the following three ways.
// const { Table } = Uxcore; // import from global if cdn js or nowa customized bundle is served in HTML
// const { Table } = require('uxcore'); // import from npm package uxcore
const Table = require('uxcore/lib/Table'); // import specified component from npm package uxcore
const Button = require('uxcore/lib/Button');
const React = require('react');

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
                data: this.state.content.list || []
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
                <h1>LINKS</h1>
                <ul>
                    <li>Form: <a href="/form.html">Form Demo</a></li>
                    <li>Table: <a href="/table.html">Table Demo</a></li>
                </ul>
                <Button>测试</Button>
            </div>
        );
    }
}

reactMixin.onClass(PageDemo, Reflux.connect(Store));

ReactDOM.render(<PageDemo/>, document.getElementById('App'));

module.exports = PageDemo;

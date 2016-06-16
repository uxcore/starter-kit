require('./PageForm.less');

const reactMixin = require('react-mixin');

const i18n = require('i18n');

const Actions = require('./actions');
const Store = require('./store');

const {Form, Button} = Uxcore;
const {InputFormField} = Form;

class FormDemo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount() {

    }

    handleClick() {
        let data = this.refs.form.getValues();
        alert(JSON.stringify(data));
    }

    handleReset() {
        this.refs.form.resetValues();
    }

    doNickName(data, name, pass) {
        if (data[name].length >= 5) {
            console.log("花名超过5个字");
        }
    }

    handleChange(data, name, pass) {
        if (name == "nickname") {
            // name 标明目前在变化中的表单域
            this.doNickName(data, name, pass);
        }
    }

    render() {
        return (
            <div className="form">
                <h1>Form Demo</h1>
                <Form ref="form" jsxvalues={{
                    // key 与 Field 里的 jsxname 相对应
                    nickname: '杨过'
                }} jsxonChange={this.handleChange.bind(this)}>
                    <InputFormField jsxname="nickname" jsxlabel="花名" jsxrules={[
                        {
                            validator: function(value) {
                                // return true 表示通过校验
                                return value.length > 0;
                            }, 
                            errMsg: "不能为空"
                        },
                        {
                            validator: function(value) {
                                // 在第一个校验通过后，才会执行第二个校验
                                return value.length <= 5;
                            }, 
                            errMsg: "不能超过5个字"
                        }
                    ]} />
                </Form>
                <Button onClick={this.handleClick.bind(this)}>提交</Button>
                <Button type="secondary" style={{marginLeft: 10}} onClick={this.handleReset.bind(this)}>重置</Button>
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

reactMixin.onClass(FormDemo, Reflux.connect(Store));

ReactDOM.render(<FormDemo/>, document.getElementById('App'));

module.exports = FormDemo;

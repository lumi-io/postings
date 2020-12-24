import React, {Component} from 'react';
import { Form, Input, Button, Checkbox, PageHeader, Space, Card, Layout } from 'antd';

const { Header, Footer, Sider, Content } = Layout;

class Login extends Component {
    render() {
        return(
            <Layout>
                <Space direction="vertical">
            <Header><PageHeader title="Title"/></Header>
            <Content>
                <Form>
                    <Form.Item>
                        <Input/>
                    </Form.Item>
                </Form>
            </Content>
            <Footer>Footer</Footer></Space>
          </Layout>);
    }
}

export default Login;
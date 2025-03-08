import { useState, useContext, useEffect } from "react";
import { Form, Input, Button, message, Typography, Card, Divider, Checkbox, Row, Col } from "antd";
import { UserOutlined, LockOutlined, GoogleOutlined, GithubOutlined } from "@ant-design/icons";
import { login } from "../api/auth";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

const { Title, Text } = Typography;

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const { login: setUser, user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect if already logged in
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  const handleLogin = async (values) => {
    setLoading(true);
    try {
      const { data } = await login(values);
      setUser(data.user);
      message.success("Login successful!");
      navigate("/dashboard");
    } catch (error) {
      message.error(error.response?.data?.message || "Login failed. Please check your credentials.");
      form.setFields([
        {
          name: "password",
          errors: ["Invalid username or password"],
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = (provider) => {
    message.info(`${provider} login is not implemented yet`);
  };

  return (
    <Row justify="center" align="middle" style={{ minHeight: "100vh", background: "#f0f2f5" }}>
      <Col xs={22} sm={16} md={12} lg={8} xl={6}>
        <Card style={{ boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)" }}>
          <div style={{ textAlign: "center", marginBottom: "24px" }}>
            <Title level={2} style={{ margin: "0 0 8px 0" }}>Welcome Back</Title>
            <Text type="secondary">Sign in to continue to your account</Text>
          </div>

          <Form
            form={form}
            layout="vertical"
            onFinish={handleLogin}
            initialValues={{ remember: true }}
          >
            <Form.Item
              name="username"
              rules={[{ required: true, message: "Please enter your username" }]}
            >
              <Input 
                prefix={<UserOutlined style={{ color: "rgba(0,0,0,.25)" }} />} 
                placeholder="Username" 
                size="large"
              />
            </Form.Item>
            
            <Form.Item
              name="password"
              rules={[{ required: true, message: "Please enter your password" }]}
            >
              <Input.Password 
                prefix={<LockOutlined style={{ color: "rgba(0,0,0,.25)" }} />} 
                placeholder="Password" 
                size="large"
              />
            </Form.Item>
            
            <Form.Item>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Form.Item name="remember" valuePropName="checked" noStyle>
                  <Checkbox>Remember me</Checkbox>
                </Form.Item>
                <Link to="/forgot-password">Forgot password?</Link>
              </div>
            </Form.Item>

            <Form.Item>
              <Button 
                type="primary" 
                htmlType="submit" 
                loading={loading} 
                block 
                size="large"
              >
                Sign In
              </Button>
            </Form.Item>

            <Form.Item style={{ textAlign: "center" }}>
              <Text type="secondary">Don't have an account? </Text>
              <Link to="/signup">Sign up now</Link>
            </Form.Item>
          </Form>

          <Divider plain>Or connect with</Divider>
          
          <div style={{ display: "flex", justifyContent: "center", gap: "16px" }}>
            <Button 
              icon={<GoogleOutlined />} 
              shape="circle" 
              size="large"
              onClick={() => handleSocialLogin("Google")}
            />
            <Button 
              icon={<GithubOutlined />} 
              shape="circle" 
              size="large"
              onClick={() => handleSocialLogin("GitHub")}
            />
          </div>
        </Card>
      </Col>
    </Row>
  );
};

export default Login;
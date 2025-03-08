import { useState, useEffect, useContext } from "react";
import { Form, Input, Button, message, Typography, Card, Divider, Row, Col, Steps, Alert } from "antd";
import { UserOutlined, LockOutlined, MailOutlined, GoogleOutlined, GithubOutlined } from "@ant-design/icons";
import { signup } from "../api/auth";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const { Title, Text, Paragraph } = Typography;
const { Step } = Steps;

const Signup = () => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [currentStep, setCurrentStep] = useState(0);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    // Redirect if already logged in
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  const handleSignup = async (values) => {
    // Remove confirmPassword before sending to API
    const { confirmPassword, ...signupData } = values;
    
    setLoading(true);
    try {
      await signup(signupData);
      message.success("Account created successfully!");
      setCurrentStep(1);
      setTimeout(() => {
        setCurrentStep(2);
        setTimeout(() => navigate("/login"), 2000);
      }, 2000);
    } catch (error) {
      message.error(error.response?.data?.message || "Registration failed. Please try again.");
      if (error.response?.data?.field) {
        form.setFields([
          {
            name: error.response.data.field,
            errors: [error.response.data.message],
          },
        ]);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSocialSignup = (provider) => {
    message.info(`${provider} registration is not implemented yet`);
  };

  const validatePassword = (_, value) => {
    const password = form.getFieldValue("password");
    if (!value || password === value) {
      return Promise.resolve();
    }
    return Promise.reject(new Error("The two passwords do not match"));
  };

  return (
    <Row justify="center" align="middle" style={{ minHeight: "100vh", background: "#f0f2f5" }}>
      <Col xs={22} sm={16} md={12} lg={8} xl={6}>
        <Card style={{ boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)" }}>
          <div style={{ textAlign: "center", marginBottom: "24px" }}>
            <Title level={2} style={{ margin: "0 0 8px 0" }}>Create Account</Title>
            <Text type="secondary">Sign up to get started</Text>
          </div>

          <Steps current={currentStep} style={{ marginBottom: "24px" }}>
            <Step title="Register" />
            <Step title="Confirm" />
            <Step title="Done" />
          </Steps>

          {currentStep === 0 && (
            <>
              <Form
                form={form}
                layout="vertical"
                onFinish={handleSignup}
                scrollToFirstError
              >
                <Form.Item
                  name="username"
                  rules={[
                    { required: true, message: "Please enter a username" },
                    { min: 8, message: "Username must be at least 8 characters" }
                  ]}
                >
                  <Input
                    prefix={<UserOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
                    placeholder="Username"
                    size="large"
                  />
                </Form.Item>

                <Form.Item
                  name="email"
                  rules={[
                    { required: true, message: "Please enter your email" },
                    { type: "email", message: "Please enter a valid email" }
                  ]}
                >
                  <Input
                    prefix={<MailOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
                    placeholder="Email"
                    size="large"
                  />
                </Form.Item>
                
                <Form.Item
                  name="password"
                  rules={[
                    { required: true, message: "Please enter a password" },
                    { min: 8, message: "Password must be at least 8 characters" }
                  ]}
                  hasFeedback
                >
                  <Input.Password
                    prefix={<LockOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
                    placeholder="Password"
                    size="large"
                  />
                </Form.Item>
                
                <Form.Item
                  name="confirmPassword"
                  dependencies={["password"]}
                  hasFeedback
                  rules={[
                    { required: true, message: "Please confirm your password" },
                    { validator: validatePassword }
                  ]}
                >
                  <Input.Password
                    prefix={<LockOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
                    placeholder="Confirm Password"
                    size="large"
                  />
                </Form.Item>

                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={loading}
                    block
                    size="large"
                  >
                    Sign Up
                  </Button>
                </Form.Item>

                <Form.Item style={{ textAlign: "center" }}>
                  <Text type="secondary">Already have an account? </Text>
                  <Link to="/login">Sign in</Link>
                </Form.Item>
              </Form>

              <Divider plain>Or sign up with</Divider>
              
              <div style={{ display: "flex", justifyContent: "center", gap: "16px" }}>
                <Button
                  icon={<GoogleOutlined />}
                  shape="circle"
                  size="large"
                  onClick={() => handleSocialSignup("Google")}
                />
                <Button
                  icon={<GithubOutlined />}
                  shape="circle"
                  size="large"
                  onClick={() => handleSocialSignup("GitHub")}
                />
              </div>
            </>
          )}

          {currentStep === 1 && (
            <div style={{ textAlign: "center" }}>
              <Alert
                message="Account created successfully!"
                description="Finalizing your account setup..."
                type="success"
                showIcon
              />
            </div>
          )}

          {currentStep === 2 && (
            <div style={{ textAlign: "center" }}>
              <Alert
                message="Registration Complete"
                description="Redirecting you to login page..."
                type="success"
                showIcon
              />
            </div>
          )}
        </Card>
      </Col>
    </Row>
  );
};

export default Signup;

import React, { useState } from 'react';
import { Form, Select, Button, Row, Col, Tree } from 'antd';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import { roleDic } from '../dic.config';
import { routerConfig } from '../../../config/routers';

// 表单项
const FormItem = Form.Item;
const { Option } = Select;

// 组件定义
export default () => {

    // 设置按钮加载状态（提交未执行完时，不能点击）
    const [loading, setLoading] = useState(false);

    // 获取表单
    const [form] = Form.useForm();

    // 新的路由配置，用于显示在界面上
    const [configStr, setConfigStr] = useState([]);

    // 提交事件（根据选中的菜单，重新生成新的路由配置项）
    const handleSubmit = async () => {
        console.log('勾选的菜单', checkedKeys);

        const fieldsValue = await form.validateFields();

        setLoading(true);

        // 所选的角色
        let role = fieldsValue.role;

        // 新的路由配置
        let newRouterConfig = routerConfig;

        // 删除之前已有的该角色对应的权限
        newRouterConfig.filter((item) => {

            // 找第一层（路由权限不为空）
            if (item.authority !== undefined) {
                // 删除权限
                item.authority = item.authority.filter(function (authorityitem) {
                    return authorityitem !== role;
                });
            }

            // 找第二层（二级不为空，也需要处理）
            if (item.routes !== undefined) {
                // 遍历二级路由
                item.routes.filter((childrenItem) => {
                    // 路由权限不为空
                    if (childrenItem.authority !== undefined) {
                        // 删除权限
                        childrenItem.authority = childrenItem.authority.filter(function (authorityitem) {
                            return authorityitem !== role;
                        });
                    }
                    return childrenItem;
                })
            }
            return item;
        });

        // 根据角色名称查询菜单
        newRouterConfig.filter((item) => {
            // 找第一层：选中的节点中包含节点，节点不为空或者没有该权限
            if (checkedKeys.indexOf(item.key) >= 0 && (item.authority === undefined || item.authority.indexOf(role) < 0)) {
                // 权限不为空，则加入新的权限，否则设置权限
                if (item.authority !== undefined) {
                    item.authority.push(role);
                } else {
                    item.authority = [role];
                }
            }

            // 找第二层
            if (item.routes !== undefined) {
                // 遍历子节点
                item.routes.filter((childrenItem) => {
                    // 选中的节点中包含该节点，节点权限不为空或者没有该权限
                    if (checkedKeys.indexOf(childrenItem.key) >= 0 && (childrenItem.authority === undefined || childrenItem.authority.indexOf(role) < 0)) {
                        // 父级菜单也需要加权限
                        if (item.authority !== undefined) {
                            // 不包含此权限，则添加，否则不处理
                            if (item.authority.indexOf(role) < 0) {
                                item.authority.push(role);
                            }
                        } else {
                            // 没有权限，则设置
                            item.authority = [role];
                        }
                        // 子节点的权限不为空，则添加，否则设置权限
                        if (childrenItem.authority !== undefined) {
                            childrenItem.authority.push(role);
                        } else {
                            childrenItem.authority = [role];
                        }
                    }
                    return childrenItem;
                })
            }

            return item;
        })

        // 设置节目显示的路由值
        setConfigStr(newRouterConfig);

        //console.log("newRouterConfig", JSON.stringify(newRouterConfig));

        setLoading(false);
    };

    // 取消事件
    const handleCancel = () => {
        location.reload();
    }

    // 通过读取路由配置文件，设置菜单数据
    const treeData = routerConfig.map((item) => {
        var menuItem = {};
        // 没有名称的路由不可勾选
        if (item.name === undefined) {
            menuItem.disabled = true;
            menuItem.disableCheckbox = true;
        }
        menuItem.title = item.name;
        menuItem.key = item.key;
        menuItem.children = item.routes === undefined ? [] : item.routes.map((item) => {
            var childrenItem = {};
            childrenItem.title = item.name;
            childrenItem.key = item.key;
            return childrenItem;
        });
        return menuItem;
    });
  

    // 勾选节点key数组
    const [checkedKeys, setCheckedKeys] = useState([]);
    // 勾选事件
    const onCheck = (keys) => {
        setCheckedKeys(keys);
    };

    // 角色下拉选框Change事件：根据角色设置菜单勾选值
    const onChange = (value) => {
        //console.log('所选角色', value);

        let keys = [];
        // 根据角色名称查询菜单
        routerConfig.filter((item) => {
            // 找第一层(没有子节点时，才设置第一层)
            if (item.routes === undefined && item.authority !== undefined && item.authority.indexOf(value) >= 0) {
                keys.push(item.key);
            }

            // 找第二层（二级如果全部选中时，会自动选中一级，因此不需要处理有二级的节点）
            if (item.routes !== undefined) {
                item.routes.filter((childrenItem) => {
                    if (childrenItem.authority !== undefined && childrenItem.authority.indexOf(value) >= 0) {
                        keys.push(childrenItem.key);
                    }
                })
            }
        })

        // 设置选中值
        setCheckedKeys(keys);
        //console.log('勾选的菜单', checkedKeys);
    };

    // 表单内容
    const renderContent = () => {
        return (
            <>
                <Row>
                    <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                        <Row>
                            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                <FormItem
                                    name="role"
                                    label="角色"
                                    rules={[{ required: true, message: '请选择角色！' }]}
                                >
                                    <Select style={{ width: '100%' }} showSearch onChange={onChange}>
                                        {roleDic.map(name => (
                                            <Option key={name} value={name}>{name}</Option>
                                        ))}
                                    </Select>
                                </FormItem>
                            </Col>
                            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                <FormItem
                                    name="menuList"
                                    label="菜单"
                                >
                                    <Tree
                                        checkable
                                        defaultExpandAll
                                        autoExpandParent
                                        onCheck={onCheck}
                                        checkedKeys={checkedKeys}
                                        treeData={treeData}
                                    />
                                </FormItem>
                            </Col>
                        </Row>
                    </Col>

                    <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                        生成的新的路由配置，格式化后，替换routers.js中的routerConfig值：<br />
                        {JSON.stringify(configStr)}
                    </Col>
                </Row>
                <FooterToolbar>
                    <Button key="submit" size='small' type="primary" loading={loading} style={{ marginRight: 8 }} onClick={() => handleSubmit()}>
                        生成新的路由配置
                    </Button>
                    <Button key="cancel" size='small' type="default" onClick={() => handleCancel()}>
                        刷新页面
                    </Button>
                </FooterToolbar>
            </>
        );
    };

    return (
        <PageContainer>
            <Form
                labelCol={{ span: 7 }}
                wrapperCol={{ span: 14 }}
                form={form}
                size='small'
                initialValues={{
                    role: '',
                }}
            >
                {renderContent()}
            </Form>
        </PageContainer>

    );
};


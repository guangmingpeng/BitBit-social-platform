import React, { useState } from "react";
import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Tag,
  Input,
  Avatar,
  Badge,
  Spinner,
  Modal,
  ModalHeader,
  ModalTitle,
  ModalBody,
  ModalFooter,
  Grid,
  Stack,
  Container,
} from "@/components/ui";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/Tabs";
import DesignSystemShowcase from "./DesignSystemShowcase";
import ActivityCard from "@/features/activities/components/ActivityCard";
import UserCard from "@/features/auth/components/UserCard";
import PostCard from "@/features/community/components/PostCard";

const ComponentShowcase: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLoadingDemo = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <div className="container-main py-12 space-y-12">
      <header className="text-center space-y-4">
        <h1 className="text-title-1 font-bold text-text-primary">
          BitBit 组件系统
        </h1>
        <p className="text-body-lg text-text-secondary max-w-2xl mx-auto">
          基于设计系统构建的可复用UI组件库，确保界面一致性和开发效率
        </p>
      </header>

      {/* Button 组件展示 */}
      <section className="space-y-6">
        <h2 className="text-title-2 font-bold text-text-primary">
          按钮 Button
        </h2>
        <Card>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-subtitle font-semibold mb-4">按钮变体</h3>
              <div className="flex flex-wrap gap-4">
                <Button variant="primary">主要按钮</Button>
                <Button variant="secondary">次要按钮</Button>
                <Button variant="outline">轮廓按钮</Button>
                <Button variant="ghost">幽灵按钮</Button>
                <Button variant="danger">危险按钮</Button>
              </div>
            </div>
            <div>
              <h3 className="text-subtitle font-semibold mb-4">按钮尺寸</h3>
              <div className="flex flex-wrap items-center gap-4">
                <Button size="sm">小尺寸</Button>
                <Button size="md">中等尺寸</Button>
                <Button size="lg">大尺寸</Button>
              </div>
            </div>
            <div>
              <h3 className="text-subtitle font-semibold mb-4">按钮状态</h3>
              <div className="flex flex-wrap gap-4">
                <Button loading={loading} onClick={handleLoadingDemo}>
                  {loading ? "加载中..." : "点击加载"}
                </Button>
                <Button disabled>禁用状态</Button>
                <Button fullWidth>全宽按钮</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Card 组件展示 */}
      <section className="space-y-6">
        <h2 className="text-title-2 font-bold text-text-primary">卡片 Card</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card variant="default">
            <CardHeader>
              <CardTitle>默认卡片</CardTitle>
              <CardDescription>这是一个默认样式的卡片</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-body text-text-secondary">
                卡片内容区域，可以放置任何内容。
              </p>
            </CardContent>
            <CardFooter>
              <Button size="sm">操作</Button>
            </CardFooter>
          </Card>

          <Card variant="elevated" hover>
            <CardHeader>
              <CardTitle>阴影卡片</CardTitle>
              <CardDescription>带阴影效果的卡片</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-body text-text-secondary">
                悬停时会有动画效果。
              </p>
            </CardContent>
          </Card>

          <Card variant="outlined">
            <CardHeader>
              <CardTitle>轮廓卡片</CardTitle>
              <CardDescription>带轮廓边框的卡片</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-body text-text-secondary">
                适合需要强调边界的场景。
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Tag 组件展示 */}
      <section className="space-y-6">
        <h2 className="text-title-2 font-bold text-text-primary">标签 Tag</h2>
        <Card>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-subtitle font-semibold mb-4">标签类型</h3>
              <div className="flex flex-wrap gap-3">
                <Tag variant="default">默认</Tag>
                <Tag variant="music">音乐</Tag>
                <Tag variant="food">美食</Tag>
                <Tag variant="learning">学习</Tag>
                <Tag variant="reading">阅读</Tag>
                <Tag variant="secondary">次要</Tag>
              </div>
            </div>
            <div>
              <h3 className="text-subtitle font-semibold mb-4">可移除标签</h3>
              <div className="flex flex-wrap gap-3">
                <Tag
                  variant="music"
                  removable
                  onRemove={() => console.log("移除音乐标签")}
                >
                  音乐
                </Tag>
                <Tag
                  variant="food"
                  removable
                  onRemove={() => console.log("移除美食标签")}
                >
                  美食
                </Tag>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Input 组件展示 */}
      <section className="space-y-6">
        <h2 className="text-title-2 font-bold text-text-primary">
          输入框 Input
        </h2>
        <Card>
          <CardContent className="space-y-6">
            <Input
              label="用户名"
              placeholder="请输入用户名"
              description="用户名需要唯一，3-20个字符"
            />
            <Input
              variant="search"
              placeholder="搜索活动..."
              leftIcon={
                <svg viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                    clipRule="evenodd"
                  />
                </svg>
              }
            />
            <Input
              label="密码"
              type="password"
              placeholder="请输入密码"
              error="密码长度至少8位"
            />
          </CardContent>
        </Card>
      </section>

      {/* Avatar 组件展示 */}
      <section className="space-y-6">
        <h2 className="text-title-2 font-bold text-text-primary">
          头像 Avatar
        </h2>
        <Card>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-subtitle font-semibold mb-4">头像尺寸</h3>
              <div className="flex flex-wrap items-center gap-4">
                <Avatar size="xs" fallback="XS" />
                <Avatar size="sm" fallback="SM" />
                <Avatar size="md" fallback="MD" />
                <Avatar size="lg" fallback="LG" />
                <Avatar size="xl" fallback="XL" />
                <Avatar size="2xl" fallback="2XL" />
              </div>
            </div>
            <div>
              <h3 className="text-subtitle font-semibold mb-4">头像状态</h3>
              <div className="flex flex-wrap items-center gap-4">
                <Avatar fallback="张" online />
                <Avatar fallback="李" />
                <Avatar fallback="王" squared />
                <Avatar
                  src="https://picsum.photos/40/40?random=1"
                  alt="用户头像"
                  online
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Badge 组件展示 */}
      <section className="space-y-6">
        <h2 className="text-title-2 font-bold text-text-primary">徽章 Badge</h2>
        <Card>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-subtitle font-semibold mb-4">独立徽章</h3>
              <div className="flex flex-wrap gap-3">
                <Badge count={5} />
                <Badge variant="success" count={10} />
                <Badge variant="warning" count={99} />
                <Badge variant="error" count={100} maxCount={99} />
                <Badge dot />
              </div>
            </div>
            <div>
              <h3 className="text-subtitle font-semibold mb-4">
                带子元素的徽章
              </h3>
              <div className="flex flex-wrap gap-6">
                <Badge count={5}>
                  <Avatar fallback="消" />
                </Badge>
                <Badge dot variant="error">
                  <Button variant="outline">通知</Button>
                </Badge>
                <Badge count={99} maxCount={99}>
                  <div className="w-8 h-8 bg-gray-200 rounded"></div>
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Spinner 组件展示 */}
      <section className="space-y-6">
        <h2 className="text-title-2 font-bold text-text-primary">
          加载器 Spinner
        </h2>
        <Card>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-subtitle font-semibold mb-4">加载器尺寸</h3>
              <div className="flex flex-wrap items-center gap-6">
                <Spinner size="xs" />
                <Spinner size="sm" />
                <Spinner size="md" />
                <Spinner size="lg" />
                <Spinner size="xl" />
              </div>
            </div>
            <div>
              <h3 className="text-subtitle font-semibold mb-4">加载器颜色</h3>
              <div className="flex flex-wrap items-center gap-6">
                <Spinner color="primary" />
                <Spinner color="gray" />
                <div className="bg-gray-800 p-4 rounded">
                  <Spinner color="white" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Modal 组件展示 */}
      <section className="space-y-6">
        <h2 className="text-title-2 font-bold text-text-primary">弹窗 Modal</h2>
        <Card>
          <CardContent>
            <Button onClick={() => setModalOpen(true)}>打开弹窗</Button>
          </CardContent>
        </Card>
      </section>

      {/* 布局组件展示 */}
      <section className="space-y-6">
        <h2 className="text-title-2 font-bold text-text-primary">布局组件</h2>

        {/* Grid 布局 */}
        <Card>
          <CardHeader>
            <CardTitle>Grid 网格布局</CardTitle>
            <CardDescription>响应式网格布局组件</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h4 className="text-body font-semibold mb-3">3列网格</h4>
              <Grid cols={3} gap="md">
                <div className="bg-primary-100 p-4 rounded text-center">
                  项目 1
                </div>
                <div className="bg-primary-100 p-4 rounded text-center">
                  项目 2
                </div>
                <div className="bg-primary-100 p-4 rounded text-center">
                  项目 3
                </div>
                <div className="bg-primary-100 p-4 rounded text-center">
                  项目 4
                </div>
                <div className="bg-primary-100 p-4 rounded text-center">
                  项目 5
                </div>
                <div className="bg-primary-100 p-4 rounded text-center">
                  项目 6
                </div>
              </Grid>
            </div>
          </CardContent>
        </Card>

        {/* Stack 布局 */}
        <Card>
          <CardHeader>
            <CardTitle>Stack 堆叠布局</CardTitle>
            <CardDescription>垂直或水平堆叠布局组件</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h4 className="text-body font-semibold mb-3">垂直堆叠</h4>
              <Stack direction="vertical" spacing="md" className="max-w-xs">
                <div className="bg-mint-100 p-3 rounded text-center">
                  项目 1
                </div>
                <div className="bg-mint-100 p-3 rounded text-center">
                  项目 2
                </div>
                <div className="bg-mint-100 p-3 rounded text-center">
                  项目 3
                </div>
              </Stack>
            </div>
            <div>
              <h4 className="text-body font-semibold mb-3">水平堆叠</h4>
              <Stack direction="horizontal" spacing="md" justify="center">
                <div className="bg-coral-100 p-3 rounded text-center">
                  项目 1
                </div>
                <div className="bg-coral-100 p-3 rounded text-center">
                  项目 2
                </div>
                <div className="bg-coral-100 p-3 rounded text-center">
                  项目 3
                </div>
              </Stack>
            </div>
          </CardContent>
        </Card>

        {/* Container 布局 */}
        <Card>
          <CardHeader>
            <CardTitle>Container 容器</CardTitle>
            <CardDescription>响应式容器组件</CardDescription>
          </CardHeader>
          <CardContent>
            <Container size="md" className="bg-lavender-100 py-6 rounded">
              <p className="text-center text-body">
                这是一个中等尺寸的容器，会根据屏幕大小自动调整最大宽度
              </p>
            </Container>
          </CardContent>
        </Card>

        {/* Tabs 组件 */}
        <Card>
          <CardHeader>
            <CardTitle>Tabs 标签页</CardTitle>
            <CardDescription>标签页组件</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="tab1">
              <TabsList>
                <TabsTrigger value="tab1">标签页 1</TabsTrigger>
                <TabsTrigger value="tab2">标签页 2</TabsTrigger>
                <TabsTrigger value="tab3">标签页 3</TabsTrigger>
              </TabsList>
              <TabsContent value="tab1">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="text-subtitle font-semibold mb-2">
                    标签页 1 内容
                  </h3>
                  <p className="text-body text-text-secondary">
                    这是第一个标签页的内容。可以在这里放置任何组件或内容。
                  </p>
                </div>
              </TabsContent>
              <TabsContent value="tab2">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="text-subtitle font-semibold mb-2">
                    标签页 2 内容
                  </h3>
                  <p className="text-body text-text-secondary">
                    这是第二个标签页的内容。标签页可以包含表单、列表或其他复杂内容。
                  </p>
                </div>
              </TabsContent>
              <TabsContent value="tab3">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="text-subtitle font-semibold mb-2">
                    标签页 3 内容
                  </h3>
                  <p className="text-body text-text-secondary">
                    这是第三个标签页的内容。每个标签页都可以有独立的状态和交互。
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </section>

      {/* Modal 实例 */}
      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <ModalHeader onClose={() => setModalOpen(false)}>
          <ModalTitle>示例弹窗</ModalTitle>
        </ModalHeader>
        <ModalBody>
          <p className="text-body text-text-secondary">
            这是一个示例弹窗内容。可以在这里放置任何内容，包括表单、图片、文字等。
          </p>
          <div className="mt-4 space-y-3">
            <Input placeholder="示例输入框" />
            <div className="flex gap-2">
              <Tag variant="music">音乐</Tag>
              <Tag variant="food">美食</Tag>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button variant="outline" onClick={() => setModalOpen(false)}>
            取消
          </Button>
          <Button onClick={() => setModalOpen(false)}>确认</Button>
        </ModalFooter>
      </Modal>

      {/* 业务组件展示 */}
      <section className="space-y-6">
        <h2 className="text-title-2 font-bold text-text-primary">业务组件</h2>

        {/* 活动卡片 */}
        <div className="space-y-4">
          <h3 className="text-title-3 font-semibold text-text-primary">
            活动卡片
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ActivityCard
              id="1"
              title="周末音乐分享会"
              description="来一起分享你喜欢的音乐，结识志同道合的朋友！我们会准备茶点和小食，你只需要带上好心情和想分享的歌单。"
              category="music"
              date="2024-01-20"
              time="14:00-17:00"
              location="五道口咖啡厅二楼"
              maxParticipants={20}
              currentParticipants={15}
              organizer={{
                username: "音乐小子",
                avatar: "https://picsum.photos/40/40?random=1",
              }}
              images={["https://picsum.photos/300/200?random=1"]}
              price={35}
              onJoin={() => console.log("参加活动")}
              onClick={() => console.log("查看活动详情")}
            />
            <ActivityCard
              id="2"
              title="免费瑜伽体验课"
              description="零基础瑜伽课程，专业老师指导，提供瑜伽垫和其他用具。"
              category="learning"
              date="2024-01-22"
              time="19:00-20:30"
              location="健身工作室"
              maxParticipants={15}
              currentParticipants={12}
              organizer={{
                username: "瑜伽导师Anna",
              }}
              images={["https://picsum.photos/300/200?random=2"]}
              isFree={true}
              isJoined={true}
              onJoin={() => console.log("参加活动")}
              onClick={() => console.log("查看活动详情")}
            />
          </div>
        </div>

        {/* 用户卡片 */}
        <div className="space-y-4">
          <h3 className="text-title-3 font-semibold text-text-primary">
            用户卡片
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <UserCard
              id="1"
              name="张小明"
              bio="热爱音乐和美食的程序员，喜欢参加各种线下活动"
              avatar="https://picsum.photos/80/80?random=3"
              location="北京 海淀区"
              interests={["音乐", "美食", "编程", "摄影"]}
              mutualFriends={5}
              isOnline={true}
              joinedDate="2023年6月"
              onFollow={() => console.log("关注用户")}
              onMessage={() => console.log("发送消息")}
              onClick={() => console.log("查看用户资料")}
            />
            <UserCard
              id="2"
              name="李小美"
              bio="设计师，爱好阅读和绘画"
              location="上海 徐汇区"
              interests={["设计", "阅读", "绘画"]}
              isFollowing={true}
              joinedDate="2023年8月"
              onFollow={() => console.log("关注用户")}
              onClick={() => console.log("查看用户资料")}
            />
          </div>
        </div>

        {/* 动态卡片 */}
        <div className="space-y-4">
          <h3 className="text-title-3 font-semibold text-text-primary">
            动态卡片
          </h3>
          <div className="max-w-2xl space-y-6">
            <PostCard
              id="1"
              author={{
                name: "美食探索者",
                avatar: "https://picsum.photos/40/40?random=4",
                isVerified: true,
              }}
              content="今天去了一家超棒的日式料理店！环境很好，服务也很贴心。特别推荐他们的三文鱼刺身和天妇罗，新鲜度和口感都很棒。价格也很合理，人均150左右。已经预定了下周的位置，准备带朋友们一起去体验！"
              images={[
                "https://picsum.photos/400/300?random=5",
                "https://picsum.photos/400/300?random=6",
                "https://picsum.photos/400/300?random=7",
              ]}
              category="food"
              publishTime="2小时前"
              likes={24}
              comments={8}
              shares={3}
              isLiked={true}
              onLike={() => console.log("点赞")}
              onComment={() => console.log("评论")}
              onShare={() => console.log("分享")}
              onBookmark={() => console.log("收藏")}
              onClick={() => console.log("查看动态详情")}
            />
            <PostCard
              id="2"
              author={{
                name: "读书小屋",
                avatar: "https://picsum.photos/40/40?random=8",
              }}
              content="刚读完《百年孤独》，马尔克斯的魔幻现实主义真的太震撼了。推荐给所有喜欢文学的朋友们！"
              category="reading"
              publishTime="1天前"
              likes={15}
              comments={12}
              shares={5}
              isBookmarked={true}
              onLike={() => console.log("点赞")}
              onComment={() => console.log("评论")}
              onShare={() => console.log("分享")}
              onBookmark={() => console.log("收藏")}
              onClick={() => console.log("查看动态详情")}
            />
          </div>
        </div>
      </section>

      {/* 设计系统展示 */}
      <section className="space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-title-2 font-bold text-text-primary">设计系统</h2>
          <p className="text-body text-text-secondary">
            完整的颜色、字体和间距系统展示
          </p>
        </div>
        <DesignSystemShowcase />
      </section>
    </div>
  );
};

export default ComponentShowcase;

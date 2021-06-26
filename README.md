# 棋校功能

## 页面

+ school.vue 入口文件

+ admin.vue 管理员以及教师页面入口

+ student.vue 学生页面入口

+ applySelect.vue 星阵管理员审批页面

+ applySelectInfo.vue 星阵管理员查看棋校信息

### 管理员  scRole == 10

+ aclassM：admin class Manage 管理员管理班级信息
+ astudentA：admin student Apply 管理员处理学生申请
+ ateacherA：admin teacher Apply 管理员处理教师申请
+ astudentM：admin student Manage 管理员管理棋校全部学生
+ ateacherM：admin teacher Manage 管理员管理棋校全部教师

### 教师  scRole == 20

+ tclassV：teacher class View 教师查看班级信息
+ tInfo：teacher information 教师查看个人信息
+ tstudentCM：teahcer student chess manual 教师查看学生的棋谱
+ tstudentV：teacher student View 教师查看学生的棋谱
+ troomV：teacher room View 教师查看教室列表

### 学生 scRole == 30

+ studentCM：student chess manual 学生查看自己的棋谱
+ studentInfo：studentInformation 学生查看自己的个人信息
+ studentR：studentRoom 学生查看教师列表
+ studentSchoolInfo：学生查看棋校信息

### 管理员&教师

+ schoolInfo:查看棋校信息，管理员与教师看到的信息不同，管理员可编辑

### 认证

+ authenticateBox ---- 认证外层组件，包含顶部title和其他所有认证页面
+ authenStep --- 学生/老师认证外层组件，包含简略个人认证消息组件、学生认证、老师认证页面
+ createGroup --- 创建学校页面
+ authenStepSelect --- 学生认证/老师认证选择页面
+ autenTeacher --- 老师认证页面
+ autenStudent --- 学生认证页面
+ auditPage --- 认证状态页面
+ authenInfo --- 信息页外层组件，包含个人信息页和学校信息页
+ authenPersonal --- 个人信息页
+ authenGroupInfo --- 学校信息页
+ personalCert --- 个人认证页

___未加：管理员查看棋校所有棋谱 在admin.vue中将棋谱加children分为棋校棋谱和所教学生的棋谱___

## 路径参数

+ params1：school_id 学校的id 在school.vue中获取并在authenPersonal中选择后赋值
+ params2: scRole 用户在当前school的权限
+ params3: classId 在查看学生和棋谱时用到，从班级跳转时携带classId

## 参数

+ username：本地变量
  
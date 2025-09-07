import React, { useState } from "react";
import { Input, Button } from "@/components/ui";
import type { EditableUserProfile } from "../../types";

interface VerificationFormProps {
  data: EditableUserProfile;
  onChange: (updates: Partial<EditableUserProfile>) => void;
  isPreviewMode?: boolean;
}

interface VerificationUpload {
  realNameId?: File;
  studentCard?: File;
  employmentProof?: File;
}

export const VerificationForm: React.FC<VerificationFormProps> = ({
  data,
  onChange,
  isPreviewMode = false,
}) => {
  const [uploads, setUploads] = useState<VerificationUpload>({});
  const [phoneVerificationCode, setPhoneVerificationCode] = useState("");
  const [emailVerificationCode, setEmailVerificationCode] = useState("");
  const [schoolEmailVerificationCode, setSchoolEmailVerificationCode] =
    useState("");
  const [companyEmailVerificationCode, setCompanyEmailVerificationCode] =
    useState("");
  const [isPhoneCodeSent, setIsPhoneCodeSent] = useState(false);
  const [isEmailCodeSent, setIsEmailCodeSent] = useState(false);
  const [isSchoolEmailCodeSent, setIsSchoolEmailCodeSent] = useState(false);
  const [isCompanyEmailCodeSent, setIsCompanyEmailCodeSent] = useState(false);

  // 发送手机验证码
  const sendPhoneCode = async () => {
    if (!data.verifications.phone.phoneNumber) {
      alert("请先输入手机号码");
      return;
    }
    // TODO: 实际发送验证码的API调用
    setIsPhoneCodeSent(true);
    alert("验证码已发送到您的手机");
  };

  // 发送邮箱验证码
  const sendEmailCode = async () => {
    if (!data.email) {
      alert("请先输入邮箱地址");
      return;
    }
    // TODO: 实际发送验证码的API调用
    setIsEmailCodeSent(true);
    alert("验证码已发送到您的邮箱");
  };

  // 发送学校邮箱验证码
  const sendSchoolEmailCode = async () => {
    if (!data.verifications.student.schoolEmail) {
      alert("请先输入学校邮箱");
      return;
    }
    // TODO: 实际发送验证码的API调用
    setIsSchoolEmailCodeSent(true);
    alert("验证码已发送到您的学校邮箱");
  };

  // 发送公司邮箱验证码
  const sendCompanyEmailCode = async () => {
    if (!data.verifications.employment.companyEmail) {
      alert("请先输入公司邮箱");
      return;
    }
    // TODO: 实际发送验证码的API调用
    setIsCompanyEmailCodeSent(true);
    alert("验证码已发送到您的公司邮箱");
  };

  // 验证手机号码
  const verifyPhone = async () => {
    if (!phoneVerificationCode) {
      alert("请输入验证码");
      return;
    }
    // TODO: 实际验证的API调用
    onChange({
      verifications: {
        ...data.verifications,
        phone: {
          ...data.verifications.phone,
          status: "verified",
          isVerified: true,
          verifiedAt: new Date().toISOString(),
        },
      },
    });
    alert("手机验证成功！");
  };

  // 验证邮箱
  const verifyEmail = async () => {
    if (!emailVerificationCode) {
      alert("请输入验证码");
      return;
    }
    // TODO: 实际验证的API调用
    onChange({
      verifications: {
        ...data.verifications,
        email: {
          ...data.verifications.email,
          status: "verified",
          isVerified: true,
          verifiedAt: new Date().toISOString(),
          verifiedEmail: data.email,
        },
      },
    });
    alert("邮箱验证成功！");
  };

  // 验证学校邮箱
  const verifySchoolEmail = async () => {
    if (!schoolEmailVerificationCode) {
      alert("请输入验证码");
      return;
    }
    // TODO: 实际验证的API调用
    onChange({
      verifications: {
        ...data.verifications,
        student: {
          ...data.verifications.student,
          isSchoolEmailVerified: true,
        },
      },
    });
    alert("学校邮箱验证成功！");
  };

  // 验证公司邮箱
  const verifyCompanyEmail = async () => {
    if (!companyEmailVerificationCode) {
      alert("请输入验证码");
      return;
    }
    // TODO: 实际验证的API调用
    onChange({
      verifications: {
        ...data.verifications,
        employment: {
          ...data.verifications.employment,
          isCompanyEmailVerified: true,
        },
      },
    });
    alert("公司邮箱验证成功！");
  };

  // 提交实名认证
  const submitRealNameVerification = async () => {
    if (!data.verifications.realName.verifiedName || !uploads.realNameId) {
      alert("请填写真实姓名并上传身份证件");
      return;
    }
    // TODO: 实际提交的API调用
    onChange({
      verifications: {
        ...data.verifications,
        realName: {
          ...data.verifications.realName,
          status: "pending",
        },
      },
    });
    alert("实名认证资料已提交，请等待审核");
  };

  // 提交学生认证
  const submitStudentVerification = async () => {
    if (!data.verifications.student.school || !uploads.studentCard) {
      alert("请填写学校信息并上传学生证");
      return;
    }
    // TODO: 实际提交的API调用
    onChange({
      verifications: {
        ...data.verifications,
        student: {
          ...data.verifications.student,
          status: "pending",
        },
      },
    });
    alert("学生认证资料已提交，请等待审核");
  };

  // 提交工作认证
  const submitEmploymentVerification = async () => {
    if (!data.verifications.employment.company || !uploads.employmentProof) {
      alert("请填写公司信息并上传工作证明");
      return;
    }
    // TODO: 实际提交的API调用
    onChange({
      verifications: {
        ...data.verifications,
        employment: {
          ...data.verifications.employment,
          status: "pending",
        },
      },
    });
    alert("工作认证资料已提交，请等待审核");
  };

  // 状态图标和颜色
  const getStatusDisplay = (status: string, isVerified: boolean) => {
    if (isVerified) {
      return { icon: "✅", color: "text-green-600", text: "已认证" };
    }
    switch (status) {
      case "pending":
        return { icon: "⏳", color: "text-yellow-600", text: "审核中" };
      case "rejected":
        return { icon: "❌", color: "text-red-600", text: "认证失败" };
      default:
        return { icon: "⚪", color: "text-gray-400", text: "未认证" };
    }
  };

  if (isPreviewMode) {
    return (
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          身份认证状态
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* 认证状态卡片 */}
          {[
            { key: "realName", title: "实名认证", desc: "提升账户安全性" },
            { key: "student", title: "学生认证", desc: "享受学生专属福利" },
            { key: "employment", title: "工作认证", desc: "职场人士专属标识" },
            { key: "phone", title: "手机认证", desc: "账户安全保护" },
            { key: "email", title: "邮箱认证", desc: "找回密码保护" },
          ].map((item) => {
            const verification =
              data.verifications[item.key as keyof typeof data.verifications];
            const status = getStatusDisplay(
              verification.status,
              verification.isVerified
            );
            return (
              <div
                key={item.key}
                className="p-4 border border-gray-200 rounded-lg"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-gray-900">{item.title}</h3>
                    <p className="text-sm text-gray-500">{item.desc}</p>
                  </div>
                  <div className="text-right">
                    <div className={`text-xl ${status.color}`}>
                      {status.icon}
                    </div>
                    <div className={`text-xs ${status.color}`}>
                      {status.text}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">身份认证</h2>

      {/* 实名认证 */}
      <div className="p-6 border border-gray-200 rounded-lg">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <h3 className="text-lg font-medium text-gray-900">实名认证</h3>
            {data.verifications.realName.isVerified && (
              <span className="text-green-600 text-sm">✅ 已认证</span>
            )}
            {data.verifications.realName.status === "pending" && (
              <span className="text-yellow-600 text-sm">⏳ 审核中</span>
            )}
          </div>
        </div>

        {!data.verifications.realName.isVerified && (
          <div className="space-y-4">
            <Input
              label="真实姓名"
              value={data.verifications.realName.verifiedName || ""}
              onChange={(e) =>
                onChange({
                  verifications: {
                    ...data.verifications,
                    realName: {
                      ...data.verifications.realName,
                      verifiedName: e.target.value,
                    },
                  },
                })
              }
              placeholder="请输入身份证上的真实姓名"
            />

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                身份证件照片
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    setUploads({ ...uploads, realNameId: file });
                  }
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              />
              <p className="text-xs text-gray-500">
                请上传身份证正面照片，确保信息清晰可见
              </p>
            </div>

            <Button
              onClick={submitRealNameVerification}
              disabled={data.verifications.realName.status === "pending"}
            >
              提交实名认证
            </Button>

            {data.verifications.realName.rejectionReason && (
              <p className="text-red-600 text-sm">
                认证失败原因：{data.verifications.realName.rejectionReason}
              </p>
            )}
          </div>
        )}
      </div>

      {/* 学生认证 */}
      <div className="p-6 border border-gray-200 rounded-lg">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <h3 className="text-lg font-medium text-gray-900">学生认证</h3>
            {data.verifications.student.isVerified && (
              <span className="text-green-600 text-sm">✅ 已认证</span>
            )}
            {data.verifications.student.status === "pending" && (
              <span className="text-yellow-600 text-sm">⏳ 审核中</span>
            )}
          </div>
        </div>

        {!data.verifications.student.isVerified && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="学校名称"
                value={data.verifications.student.school || ""}
                onChange={(e) =>
                  onChange({
                    verifications: {
                      ...data.verifications,
                      student: {
                        ...data.verifications.student,
                        school: e.target.value,
                      },
                    },
                  })
                }
                placeholder="请输入学校全称"
              />

              <Input
                label="学号"
                value={data.verifications.student.studentId || ""}
                onChange={(e) =>
                  onChange({
                    verifications: {
                      ...data.verifications,
                      student: {
                        ...data.verifications.student,
                        studentId: e.target.value,
                      },
                    },
                  })
                }
                placeholder="请输入学号"
              />
            </div>

            <Input
              label="预计毕业年份"
              type="number"
              min="2020"
              max="2035"
              value={data.verifications.student.graduationYear || ""}
              onChange={(e) =>
                onChange({
                  verifications: {
                    ...data.verifications,
                    student: {
                      ...data.verifications.student,
                      graduationYear: e.target.value
                        ? parseInt(e.target.value)
                        : undefined,
                    },
                  },
                })
              }
              placeholder="如：2024"
            />

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                学生证照片
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    setUploads({ ...uploads, studentCard: file });
                  }
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              />
              <p className="text-xs text-gray-500">
                请上传学生证照片，确保学校信息和个人信息清晰可见
              </p>
            </div>

            {/* 学校邮箱验证 */}
            <div className="space-y-4 border-t pt-4">
              <h4 className="text-md font-medium text-gray-900 flex items-center gap-2">
                <span>📧</span>
                学校邮箱验证
                {data.verifications.student.isSchoolEmailVerified && (
                  <span className="text-green-600 text-sm">✅ 已验证</span>
                )}
              </h4>

              <Input
                label="学校邮箱"
                type="email"
                value={data.verifications.student.schoolEmail || ""}
                onChange={(e) =>
                  onChange({
                    verifications: {
                      ...data.verifications,
                      student: {
                        ...data.verifications.student,
                        schoolEmail: e.target.value,
                      },
                    },
                  })
                }
                placeholder="请输入学校邮箱（如：yourname@university.edu）"
                description="学校邮箱有助于快速验证学生身份"
              />

              {!data.verifications.student.isSchoolEmailVerified && (
                <>
                  <div className="flex gap-4">
                    <div className="flex-1">
                      <Input
                        label="邮箱验证码"
                        value={schoolEmailVerificationCode}
                        onChange={(e) =>
                          setSchoolEmailVerificationCode(e.target.value)
                        }
                        placeholder="请输入6位验证码"
                        maxLength={6}
                      />
                    </div>
                    <div className="flex items-end">
                      <Button
                        variant="outline"
                        onClick={sendSchoolEmailCode}
                        disabled={
                          !data.verifications.student.schoolEmail ||
                          isSchoolEmailCodeSent
                        }
                      >
                        {isSchoolEmailCodeSent ? "已发送" : "发送验证码"}
                      </Button>
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    onClick={verifySchoolEmail}
                    disabled={
                      !schoolEmailVerificationCode || !isSchoolEmailCodeSent
                    }
                  >
                    验证学校邮箱
                  </Button>
                </>
              )}
            </div>

            <Button
              onClick={submitStudentVerification}
              disabled={data.verifications.student.status === "pending"}
            >
              提交学生认证
            </Button>

            {data.verifications.student.rejectionReason && (
              <p className="text-red-600 text-sm">
                认证失败原因：{data.verifications.student.rejectionReason}
              </p>
            )}
          </div>
        )}
      </div>

      {/* 工作认证 */}
      <div className="p-6 border border-gray-200 rounded-lg">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <h3 className="text-lg font-medium text-gray-900">工作认证</h3>
            {data.verifications.employment.isVerified && (
              <span className="text-green-600 text-sm">✅ 已认证</span>
            )}
            {data.verifications.employment.status === "pending" && (
              <span className="text-yellow-600 text-sm">⏳ 审核中</span>
            )}
          </div>
        </div>

        {!data.verifications.employment.isVerified && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="公司名称"
                value={data.verifications.employment.company || ""}
                onChange={(e) =>
                  onChange({
                    verifications: {
                      ...data.verifications,
                      employment: {
                        ...data.verifications.employment,
                        company: e.target.value,
                      },
                    },
                  })
                }
                placeholder="请输入公司全称"
              />

              <Input
                label="职位"
                value={data.verifications.employment.position || ""}
                onChange={(e) =>
                  onChange({
                    verifications: {
                      ...data.verifications,
                      employment: {
                        ...data.verifications.employment,
                        position: e.target.value,
                      },
                    },
                  })
                }
                placeholder="请输入职位名称"
              />
            </div>

            <Input
              label="工号/员工ID"
              value={data.verifications.employment.employeeId || ""}
              onChange={(e) =>
                onChange({
                  verifications: {
                    ...data.verifications,
                    employment: {
                      ...data.verifications.employment,
                      employeeId: e.target.value,
                    },
                  },
                })
              }
              placeholder="请输入工号（可选）"
            />

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                工作证明
              </label>
              <input
                type="file"
                accept="image/*,.pdf"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    setUploads({ ...uploads, employmentProof: file });
                  }
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              />
              <p className="text-xs text-gray-500">
                请上传工作证明文件（工牌、在职证明、工作邮箱截图等）
              </p>
            </div>

            {/* 公司邮箱验证 */}
            <div className="space-y-4 border-t pt-4">
              <h4 className="text-md font-medium text-gray-900 flex items-center gap-2">
                <span>📧</span>
                公司邮箱验证
                {data.verifications.employment.isCompanyEmailVerified && (
                  <span className="text-green-600 text-sm">✅ 已验证</span>
                )}
              </h4>

              <Input
                label="公司邮箱"
                type="email"
                value={data.verifications.employment.companyEmail || ""}
                onChange={(e) =>
                  onChange({
                    verifications: {
                      ...data.verifications,
                      employment: {
                        ...data.verifications.employment,
                        companyEmail: e.target.value,
                      },
                    },
                  })
                }
                placeholder="请输入公司邮箱（如：yourname@company.com）"
                description="公司邮箱有助于快速验证工作身份"
              />

              {!data.verifications.employment.isCompanyEmailVerified && (
                <>
                  <div className="flex gap-4">
                    <div className="flex-1">
                      <Input
                        label="邮箱验证码"
                        value={companyEmailVerificationCode}
                        onChange={(e) =>
                          setCompanyEmailVerificationCode(e.target.value)
                        }
                        placeholder="请输入6位验证码"
                        maxLength={6}
                      />
                    </div>
                    <div className="flex items-end">
                      <Button
                        variant="outline"
                        onClick={sendCompanyEmailCode}
                        disabled={
                          !data.verifications.employment.companyEmail ||
                          isCompanyEmailCodeSent
                        }
                      >
                        {isCompanyEmailCodeSent ? "已发送" : "发送验证码"}
                      </Button>
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    onClick={verifyCompanyEmail}
                    disabled={
                      !companyEmailVerificationCode || !isCompanyEmailCodeSent
                    }
                  >
                    验证公司邮箱
                  </Button>
                </>
              )}
            </div>

            <Button
              onClick={submitEmploymentVerification}
              disabled={data.verifications.employment.status === "pending"}
            >
              提交工作认证
            </Button>

            {data.verifications.employment.rejectionReason && (
              <p className="text-red-600 text-sm">
                认证失败原因：{data.verifications.employment.rejectionReason}
              </p>
            )}
          </div>
        )}
      </div>

      {/* 手机认证 */}
      <div className="p-6 border border-gray-200 rounded-lg">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <h3 className="text-lg font-medium text-gray-900">手机认证</h3>
            {data.verifications.phone.isVerified && (
              <span className="text-green-600 text-sm">✅ 已认证</span>
            )}
          </div>
        </div>

        {!data.verifications.phone.isVerified && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  国家/地区
                </label>
                <select
                  value={data.verifications.phone.countryCode || "+86"}
                  onChange={(e) =>
                    onChange({
                      verifications: {
                        ...data.verifications,
                        phone: {
                          ...data.verifications.phone,
                          countryCode: e.target.value,
                        },
                      },
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                >
                  <option value="+86">🇨🇳 中国 (+86)</option>
                  <option value="+1">🇺🇸 美国 (+1)</option>
                  <option value="+44">🇬🇧 英国 (+44)</option>
                  <option value="+81">🇯🇵 日本 (+81)</option>
                  <option value="+82">🇰🇷 韩国 (+82)</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <Input
                  label="手机号码"
                  value={data.verifications.phone.phoneNumber || ""}
                  onChange={(e) =>
                    onChange({
                      verifications: {
                        ...data.verifications,
                        phone: {
                          ...data.verifications.phone,
                          phoneNumber: e.target.value,
                        },
                      },
                    })
                  }
                  placeholder="请输入手机号码"
                />
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-1">
                <Input
                  label="验证码"
                  value={phoneVerificationCode}
                  onChange={(e) => setPhoneVerificationCode(e.target.value)}
                  placeholder="请输入6位验证码"
                  maxLength={6}
                />
              </div>
              <div className="flex items-end">
                <Button
                  variant="outline"
                  onClick={sendPhoneCode}
                  disabled={
                    !data.verifications.phone.phoneNumber || isPhoneCodeSent
                  }
                >
                  {isPhoneCodeSent ? "已发送" : "发送验证码"}
                </Button>
              </div>
            </div>

            <Button
              onClick={verifyPhone}
              disabled={!phoneVerificationCode || !isPhoneCodeSent}
            >
              验证手机号码
            </Button>
          </div>
        )}
      </div>

      {/* 邮箱认证 */}
      <div className="p-6 border border-gray-200 rounded-lg">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <h3 className="text-lg font-medium text-gray-900">邮箱认证</h3>
            {data.verifications.email.isVerified && (
              <span className="text-green-600 text-sm">✅ 已认证</span>
            )}
          </div>
        </div>

        {!data.verifications.email.isVerified && (
          <div className="space-y-4">
            <Input
              label="邮箱地址"
              type="email"
              value={data.email}
              onChange={(e) => onChange({ email: e.target.value })}
              placeholder="请输入邮箱地址"
              description="请输入要验证的邮箱地址"
            />

            <div className="flex gap-4">
              <div className="flex-1">
                <Input
                  label="验证码"
                  value={emailVerificationCode}
                  onChange={(e) => setEmailVerificationCode(e.target.value)}
                  placeholder="请输入6位验证码"
                  maxLength={6}
                />
              </div>
              <div className="flex items-end">
                <Button
                  variant="outline"
                  onClick={sendEmailCode}
                  disabled={!data.email || isEmailCodeSent}
                >
                  {isEmailCodeSent ? "已发送" : "发送验证码"}
                </Button>
              </div>
            </div>

            <Button
              onClick={verifyEmail}
              disabled={!emailVerificationCode || !isEmailCodeSent}
            >
              验证邮箱
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

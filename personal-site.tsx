import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Sparkles, ArrowRight, Github, Mail, ExternalLink, MapPin, GraduationCap, Briefcase } from 'lucide-react';

export default function Home() {
  const projects = [
    {
      title: '衣搭 — AI 穿搭助手',
      role: '独立产品项目',
      description: '面向 18-25 岁年轻女性的 AI 穿搭助手。上传衣物后通过三层滑动自由搭配，AI 根据天气、场合、风格推荐整套穿搭。',
      highlights: ['用户调研与需求验证', 'PRD 撰写与功能规划', 'AI 交互逻辑设计', 'Vibe Coding 原型开发'],
      link: 'https://yida-outfit.surge.sh',
      tags: ['产品设计', 'AI', '用户研究', 'Vibe Coding']
    },
    {
      title: '校内竞赛聚合与组队平台',
      role: '产品项目',
      description: '面向校内学生的竞赛信息聚合与组队匹配小程序。完成竞品分析、PRD、产品流程图及高保真原型设计。',
      highlights: ['竞品分析', 'PRD 撰写', '流程图设计', '原型设计'],
      link: null,
      tags: ['产品设计', '校园', '原型']
    }
  ];

  const education = [
    { school: 'XX大学', degree: '信息安全 × 法学 双学位', period: '2024 — 2028', icon: GraduationCap }
  ];

  const skills = [
    { category: '产品', items: ['需求分析', '用户调研', '竞品分析', 'PRD 撰写', '流程图', '原型设计'] },
    { category: '工具', items: ['Figma', 'Axure', 'Xmind', 'Trae', 'Office'] },
    { category: '技术', items: ['Python', 'HTML/CSS', 'JavaScript', 'AI 大模型应用'] }
  ];

  return (
    <div className="min-h-screen bg-[#F8F8F6]">
      {/* Hero */}
      <section className="relative pt-20 pb-12 md:pt-32 md:pb-20 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-2 text-sm text-[#8B7E74] mb-4 tracking-widest uppercase">
            <span className="w-8 h-px bg-[#8B7E74]"></span>
            Portfolio
          </div>
          <h1 className="text-4xl md:text-5xl font-light text-[#2D2D2D] leading-tight mb-4">
            你好，我是<span className="font-medium">小陈</span>
          </h1>
          <p className="text-lg md:text-xl text-[#8C8C8C] font-light leading-relaxed">
            双学位在读 · 产品新人 · 用 AI 和设计思维解决问题
          </p>
          <div className="flex flex-wrap gap-3 mt-8">
            <Button className="bg-[#8B7E74] hover:bg-[#7A6E64] text-white rounded-full px-6">
              <Mail className="w-4 h-4 mr-2" /> 联系我
            </Button>
            <Button variant="outline" className="border-[#E8E8E5] text-[#2D2D2D] hover:bg-[#F0EDEA] rounded-full px-6">
              <Github className="w-4 h-4 mr-2" /> GitHub
            </Button>
          </div>
        </div>
      </section>

      {/* About */}
      <section className="py-12 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <span className="w-8 h-px bg-[#8B7E74]"></span>
            <h2 className="text-sm tracking-widest text-[#8B7E74] uppercase font-medium">About</h2>
          </div>
          <p className="text-base text-[#8C8C8C] leading-relaxed">
            信息安全与法学双学位在读，正在寻找产品实习机会。
            习惯用产品思维拆解问题，享受从 0 到 1 定义产品的过程。
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
            <Card className="bg-white border-[#E8E8E5] rounded-2xl shadow-sm">
              <CardContent className="p-5">
                <GraduationCap className="w-5 h-5 text-[#8B7E74] mb-3" />
                <div className="text-sm font-medium text-[#2D2D2D]">信息安全 × 法学</div>
                <div className="text-xs text-[#8C8C8C] mt-1">双学位 · 大二</div>
              </CardContent>
            </Card>
            <Card className="bg-white border-[#E8E8E5] rounded-2xl shadow-sm">
              <CardContent className="p-5">
                <Sparkles className="w-5 h-5 text-[#8B7E74] mb-3" />
                <div className="text-sm font-medium text-[#2D2D2D]">产品方向</div>
                <div className="text-xs text-[#8C8C8C] mt-1">PM 实习求职中</div>
              </CardContent>
            </Card>
            <Card className="bg-white border-[#E8E8E5] rounded-2xl shadow-sm">
              <CardContent className="p-5">
                <MapPin className="w-5 h-5 text-[#8B7E74] mb-3" />
                <div className="text-sm font-medium text-[#2D2D2D]">Base 北京</div>
                <div className="text-xs text-[#8C8C8C] mt-1">随时到岗</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Projects */}
      <section className="py-12 px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <span className="w-8 h-px bg-[#8B7E74]"></span>
            <h2 className="text-sm tracking-widest text-[#8B7E74] uppercase font-medium">Projects</h2>
          </div>
          <div className="space-y-8">
            {projects.map((project, i) => (
              <Card key={i} className="bg-[#F8F8F6] border-[#E8E8E5] rounded-2xl shadow-sm hover:shadow-md transition-all duration-300">
                <CardContent className="p-6 md:p-8">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="text-xs text-[#8B7E74] font-medium mb-1">{project.role}</div>
                      <h3 className="text-lg font-medium text-[#2D2D2D]">{project.title}</h3>
                    </div>
                    {project.link && (
                      <a href={project.link} target="_blank" className="text-[#8B7E74] hover:text-[#7A6E64] transition-colors" rel="noreferrer">
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                  <p className="text-sm text-[#8C8C8C] leading-relaxed mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag) => (
                      <span key={tag} className="text-xs px-3 py-1 bg-[#F0EDEA] text-[#8B7E74] rounded-full">{tag}</span>
                    ))}
                  </div>
                  {project.highlights && (
                    <ul className="space-y-1.5">
                      {project.highlights.map((h, j) => (
                        <li key={j} className="text-sm text-[#8C8C8C] flex items-center gap-2">
                          <span className="w-1 h-1 rounded-full bg-[#8B7E74] flex-shrink-0"></span>
                          {h}
                        </li>
                      ))}
                    </ul>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Skills */}
      <section className="py-12 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <span className="w-8 h-px bg-[#8B7E74]"></span>
            <h2 className="text-sm tracking-widest text-[#8B7E74] uppercase font-medium">Skills</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {skills.map((group) => (
              <div key={group.category}>
                <h3 className="text-sm font-medium text-[#2D2D2D] mb-3">{group.category}</h3>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span key={item} className="text-sm px-3 py-1.5 bg-white border border-[#E8E8E5] text-[#8C8C8C] rounded-lg">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-[#E8E8E5]">
        <div className="max-w-3xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-sm text-[#8C8C8C]">© 2026 小陈 · All rights reserved</div>
          <div className="flex items-center gap-4">
            <a href="mailto:2901855821@qq.com" className="text-sm text-[#8C8C8C] hover:text-[#8B7E74] transition-colors">Email</a>
            <span className="text-[#E8E8E5]">/</span>
            <a href="#" className="text-sm text-[#8C8C8C] hover:text-[#8B7E74] transition-colors">GitHub</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

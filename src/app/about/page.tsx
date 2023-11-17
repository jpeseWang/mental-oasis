import React from 'react'
import { type Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import clsx from 'clsx'

import { Container } from '@/components/Container'
import {
  GitHubIcon,
  InstagramIcon,
  LinkedInIcon,
  TwitterIcon,
} from '@/components/SocialIcons'
import coverImage from '@/images/coverImg.jpg'

function SocialLink({
  className,
  href,
  children,
  icon: Icon,
}: {
  className?: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  children: React.ReactNode
}) {
  return (
    <li className={clsx(className, 'flex')}>
      <Link
        href={href}
        className="group flex text-sm font-medium text-zinc-800 transition hover:text-teal-500 dark:text-zinc-200 dark:hover:text-teal-500"
      >
        <Icon className="h-6 w-6 flex-none fill-zinc-500 transition group-hover:fill-teal-500" />
        <span className="ml-4">{children}</span>
      </Link>
    </li>
  )
}

function MailIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        fillRule="evenodd"
        d="M6 5a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3H6Zm.245 2.187a.75.75 0 0 0-.99 1.126l6.25 5.5a.75.75 0 0 0 .99 0l6.25-5.5a.75.75 0 0 0-.99-1.126L12 12.251 6.245 7.187Z"
      />
    </svg>
  )
}

export default function About() {
  return (
    <Container className="mt-16 sm:mt-32">
      <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-y-12">
        <div className="lg:pl-20">
          <div className="max-w-xs px-2.5 lg:max-w-none">
            <img
              src="https://media.istockphoto.com/id/1430601013/vi/anh/b%C3%A0n-tay-c%E1%BB%A7a-ng%C6%B0%E1%BB%9Di-%C4%91%C3%A0n-%C3%B4ng-tr%E1%BA%BB-tu%E1%BB%95i-h%E1%BB%97-tr%E1%BB%A3-an-%E1%BB%A7i-b%E1%BA%A1n-m%C3%ACnh-m%E1%BA%AFc-h%E1%BB%99i-ch%E1%BB%A9ng-sau-ch%E1%BA%A5n-th%C6%B0%C6%A1ng.jpg?s=1024x1024&w=is&k=20&c=0U9nB8w21csUtnYO8BSIO2yZlLDpji9bdj5qZ6ESwnI="
              alt=""
              sizes="(min-width: 1024px) 32rem, 20rem"
              className="aspect-square rotate-3 rounded-2xl bg-zinc-100 object-cover dark:bg-zinc-800"
            />
          </div>
        </div>
        <div className="lg:order-first lg:row-span-2">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
            Chào mừng bạn đến với Mental Oasis - Nơi Bạn Tìm Thấy Bình An Tâm
            Hồn!
          </h1>
          <div className="mt-6 space-y-7 text-base text-zinc-600 dark:text-zinc-400">
            <p>
              Mental Oasis là một ứng dụng đột phá, hướng dẫn tâm lý và thiền
              dưỡng tâm thông qua sự kết hợp độc đáo giữa trợ lý ảo và trải
              nghiệm thiền thực tế ảo. Chúng tôi tin rằng sức khỏe tâm lý là
              chìa khóa để một cuộc sống hạnh phúc và lành mạnh.
            </p>
          </div>
        </div>
        <div className="lg:pl-20">
          <ul role="list">
            <SocialLink
              href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
              icon={TwitterIcon}
            >
              Follow on Twitter
            </SocialLink>
            <SocialLink
              href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
              icon={InstagramIcon}
              className="mt-4"
            >
              Follow on Instagram
            </SocialLink>
            <SocialLink
              href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
              icon={GitHubIcon}
              className="mt-4"
            >
              Follow on GitHub
            </SocialLink>

            <SocialLink
              href="mailto:vanhoatruyenthongtruonghoc@gmail.com"
              icon={MailIcon}
              className="mt-8 border-t border-zinc-100 pt-8 dark:border-zinc-700/40"
            >
              mentaloasis@gmail.com
            </SocialLink>
          </ul>
        </div>
      </div>
    </Container>
  )
}

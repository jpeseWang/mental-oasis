'use client'
import Image from 'next/image'
import React, { useState } from 'react'
import CreateContributeModal from './Modal/CreateContributeModal'
import img1 from './images/img1.jpeg'
import img2 from './images/img2.jpeg'
import img3 from './images/img3.jpeg'
import img4 from './images/img4.jpeg'
import img5 from './images/img5.jpeg'
import img6 from './images/img6.jpg'
import img7 from './images/img7.jpeg'
import img8 from './images/img8.jpg'

const posts = [
  {
    title: 'Thiền Dưỡng Tâm',
    href: 'categories/sec1',
    category: { name: 'Article', href: '#' },
    description:
      'Trải nghiệm giúp bạn thư giãn và tập trung, đem lại cảm giác yên bình và an lành.',
    date: 'Mar 16, 2020',
    datetime: '2020-03-16',
    imageUrl: img1,
    readingTime: '6 min',
    author: {
      name: 'Roel Aufderehar',
      href: '#',
      imageUrl:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
  },
  // {
  //   title: 'Truyền thống học tập theo tư tưởng “Chi bằng học"',
  //   href: 'categories/sec2',
  //   category: { name: 'Video', href: '#' },
  //   description:
  //     'Triết lý học tập của trường, với thông điệp rằng học tập là ưu tiên hàng đầu. Nó có thể nêu rõ cách trường tạo điều kiện để học sinh phát triển kiến thức và kỹ năng.',
  //   date: 'Mar 10, 2020',
  //   datetime: '2020-03-10',
  //   imageUrl: img2,
  //   readingTime: '4 min',
  //   author: {
  //     name: 'Brenna Goyette',
  //     href: '#',
  //     imageUrl:
  //       'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  //   },
  // },
  // {
  //   title: 'Hoạt động ngoại khoá - nơi phong trào thăng hoa',
  //   href: 'categories/sec3',
  //   category: { name: 'Case Study', href: '#' },
  //   description:
  //     'Nêu bật vai trò của hoạt động ngoại khoá trong việc phát triển học sinh. Nó có thể đề cập đến các hoạt động và chương trình ngoại khoá mà học sinh có thể tham gia để phát triển tài năng và sở thích cá nhân.',
  //   date: 'Feb 12, 2020',
  //   datetime: '2020-02-12',
  //   imageUrl: img7,
  // },
  // {
  //   title: 'Tự hào là học sinh Phan Châu Trinh!',
  //   href: 'categories/sec4',
  //   category: { name: 'Case Study', href: '#' },
  //   description:
  //     'Thể hiện tinh thần tự hào của học sinh đối với trường Phan Châu Trinh. Có thể bao gồm những thành tựu và giá trị mà trường mong muốn học sinh thể hiện khi họ là học sinh tại đây.',

  //   imageUrl: img3,
  // },
  // {
  //   title: 'Văn hoá ứng xử',
  //   href: 'categories/sec5',
  //   category: { name: 'Case Study', href: '#' },
  //   description:
  //     'Giới thiệu chuyên mục: Văn hoá ứng xử luôn là truyền thống trường THPT Phan Châu Trinh chú trọng xây dựng và giữ gìn. Qua bao nhiêu năm tháng, văn hoá ứng xử cũng đã trở thành nét đặc trưng riêng đáng quý của các bạn học sinh trường ta.',
  //   date: 'Feb 12, 2020',
  //   datetime: '2020-02-12',
  //   imageUrl: img8,

  //   author: {
  //     name: 'Daniela Metz',
  //     href: '#',
  //     imageUrl:
  //       'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  //   },
  // },
]

export default function Example() {
  const [modalIsOpen, setIsOpen] = useState(false)
  function closeModal() {
    setIsOpen(false)
  }
  return (
    <div className="relative px-6 pb-20 pt-16 lg:px-8 lg:pb-28 lg:pt-24">
      <div className="absolute inset-0">
        <div className="h-1/3  sm:h-2/3" />
      </div>
      <div className="relative mx-auto max-w-7xl">
        <div className="mx-auto mb-12 max-w-lg bg-white shadow sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6 ">
            <h3 className="text-base font-semibold leading-6 text-gray-900">
              Hòm thư góp ý
            </h3>
            <div className="mt-2 sm:flex sm:items-start sm:justify-between">
              <div className="max-w-xl text-sm text-gray-500">
                <p>
                  Là nơi bạn có thể gửi gắm những tâm tư tình cảm hay chỉ đơn
                  giản là những đóng góp cho dự án chúng mình.
                </p>
              </div>
              <div className="mt-5 sm:ml-6 sm:mt-0 sm:flex sm:flex-shrink-0 sm:items-center">
                <button
                  type="button"
                  className="inline-flex items-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                  onClick={() => {
                    setIsOpen(true)
                  }}
                >
                  Gửi ngay
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl">
            Bài tập hỗ trợ tâm lý
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-xl text-gray-500 sm:mt-4">
            Tích hợp để tạo nên các bài tập và hướng dẫn chi tiết người dùng
            hoàn thành qua việc theo dõi các động tác và tư thế.
          </p>
        </div>
        <div className="mx-auto mt-12 grid max-w-lg gap-5 lg:max-w-none lg:grid-cols-3">
          {posts.map((post) => (
            <div
              key={post.title}
              className="flex flex-col overflow-hidden rounded-lg shadow-lg"
            >
              <div className="flex-shrink-0">
                <img
                  className="h-48 w-full object-cover"
                  src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=3040&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt=""
                />
              </div>
              <div className="flex flex-1 flex-col justify-between bg-white p-6">
                <div className="flex-1">
                  <p className="text-sm font-medium text-[#1F53A4]">
                    <a href={post.category.href} className="hover:underline">
                      {post.category.name}
                    </a>
                  </p>
                  <a href={post.href} className="mt-2 block">
                    <p className="text-xl font-semibold text-gray-900">
                      {post.title}
                    </p>
                    <p className="mt-3 text-base text-gray-500">
                      {post.description}
                    </p>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <CreateContributeModal isOpen={modalIsOpen} onClose={closeModal} />
    </div>
  )
}

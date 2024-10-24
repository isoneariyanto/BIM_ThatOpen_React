import { Link } from 'react-router-dom'

const quickstart = [
  {
    id: 1,
    title: 'Install Speckle manager',
    description: 'Use our Manager to install and manage Connectors with ease.',
    btn: [
      {
        btnId: 1,
        title: 'Download for Windows',
        link: 'https://',
      },
      {
        btnId: 2,
        title: 'Download for Mac',
        link: 'https://',
      },
    ],
  },
  {
    id: 2,
    title: "Don't know where to start?",
    description: "We'll walk you through some of most common usage scenarios.",
    btn: [
      {
        btnId: 1,
        title: 'Open documentation',
        link: 'https://',
      },
    ],
  },
  {
    id: 3,
    title: 'Have a question you need answered?',
    description:
      'Submit your question on the forum and get help from the community.',
    btn: [
      {
        btnId: 1,
        title: 'Ask a question',
        link: 'https://',
      },
    ],
  },
]
const projects = [
  {
    id: 1,
    title: 'Dekson',
    updatedAt: 'Sep 30',
    user: {
      userId: 1,
      name: 'Kardya',
      img: 'https://',
    },
    model: 2,
  },
  {
    id: 2,
    title: 'Kardya Project',
    updatedAt: 'Sep 30',
    user: {
      userId: 1,
      name: 'Kardya',
      img: 'https://',
    },
    model: {
      count: 2,
      link: 'https://',
    },
  },
]
export default function Home({}) {
  return (
    <div className="grid grid-row-6 grid-col-4 gap-4 w-full p-8">
      <h5 className="col-span-4 text-start text-lg font-medium">Quickstart</h5>
      {quickstart.map((item, key) => (
        <div className="card bg-base-100 shadow-xl p-0 border" key={key}>
          <div className="card-body">
            <h2 className="card-title">{item.title}</h2>
            <p className="text-start">{item.description}</p>
            <div className="card-actions justify-end">
              {item.btn.map((button, btnKey) => (
                <Link
                  to={button.link}
                  className="border py-1 px-2 rounded-md hover:shadow text-sm font-medium"
                  key={btnKey}
                >
                  {button.title}
                </Link>
              ))}
            </div>
          </div>
        </div>
      ))}

      <h5 className="col-span-4 text-start text-lg font-medium mt-8 w-full p-0 flex gap-4">
        Recently updated projects
        <div className="border py-1 px-2 rounded-md hover:shadow text-sm w-fit bg-white">
          View all
        </div>
      </h5>
      {projects.map((item, key) => (
        <div className="card bg-base-100 shadow-xl p-0 border" key={key}>
          <div className="card-body">
            <h2 className="card-title">{item.title}</h2>
            <p className="text-start">
              {item.user.name} * {item.updatedAt}
            </p>
            <div className="card-actions justify-start">
              <Link
                to={item.model.link}
                className="border py-1 px-2 rounded-md hover:shadow text-sm font-medium"
              >
                {item.model.count} Models &gt;
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

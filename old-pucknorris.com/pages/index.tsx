import type { GetServerSideProps, InferGetServerSidePropsType, NextPage } from 'next'
import Head from 'next/head'
import { useState } from 'react'
import BoundsWrapper from '../components/boundsWrapper'
import Image from '../components/image'
import ImageView from '../components/images/imageView'
import Label from '../components/label'
import Link from '../components/link'
import MerchView from '../components/merch/merchView'
import Picker from '../components/picker'
import EventCell2 from '../components/schedule/eventCell2'
import Schedule from '../components/schedule/schedule'
import SeasonNodeCell from '../components/schedule/seasonNodeCell'
import Selector from '../components/selector'
import XCShowcase from '../components/xcShowcase/xcShowcase'
import ApiResponse from '../data/apiResponse'
import formatDate from '../data/formatDate'
import SeasonNode from '../data/seasonNode'
import TeamSchedule from '../data/seasonNode'
import { client } from '../utils/shopify-client'

export const getServerSideProps: GetServerSideProps = async (context) => {
  const date = new Date()
  const b = { "date": formatDate(date) }

  // wrap all calls in a promise to run concurrently, 3x speed gain
  const promises: Promise<any>[] = [
    fetch(`${process.env.HOST!}/teams/${process.env.TEAMID}/teamSchedule`, {
      method: "PUT",
      headers: [["Content-Type", "application/json"]],
      body: JSON.stringify(b)
    }).then((response) => response.json()),
    fetch(`${process.env.HOST!}/images/getImagesPresigned/${process.env.TEAMID}`).then((response) => response.json()),
    client.product.fetchAll().then((response) => JSON.parse(JSON.stringify(response))),
  ]

  const data = await Promise.all(promises);


  return {
    props: {
      scheduleData: data[0],
      imageData: data[1],
      products: data[2],
    }
  }
}

const Home: NextPage = ({ scheduleData, imageData, products }: InferGetServerSidePropsType<typeof getServerSideProps>) => {

  const [index, setIndex] = useState(0)
  const [titles, setTitles] = useState<string[]>([])
  const [indexes, setIndexes] = useState<number[]>([])
  const [loaded, setLoaded] = useState<boolean>(false)

  useState(() => {
    if (!loaded) {
      const t = []
      const idxs = []
      for (var i = 0; i < scheduleData.body.length; i++) {
        const idx = i
        if (scheduleData.body[idx].nextEvent != undefined) {
          t.push(scheduleData.body[idx].title)
          idxs.push(idx)
        }
      }
      setIndex(idxs[0])
      setTitles(t)
      setIndexes(idxs)
      setLoaded(true)
    }
  })

  return <>
    <Head>
      <title>Puck Norris</title>
    </Head>
    <div className=''>
      <div className="h-[80vh] grid place-items-center">
        <div className="grid lg:grid-cols-2 gap-4">
          <div className="grid place-items-center">
            <div className="">
              <Image props={{
                src: '/images/pucknorris.png',
                alt: 'space rocket ship',
                divClass: "max-w-[500px]",
                imgClass: ""
              }} />
              <p className="max-w-xl mb-6 pt-4 text-center font-light lg:mb-8 md:text-lg lg:text-xl text-gray-400">The most badass beer league hockey team in the pacific northwest!</p>
              <div className="grid place-items-center">
                <div className="flex space-x-2">
                  <Link props={{
                    href: '#schedule',
                    child: <p>Schedule</p>,
                    isExternal: false,
                    className: "px-4 py-2 bg-bg-700 border border-bg-500 rounded-md font-medium hover:bg-bg-500 transition-all"
                  }} />
                  <Link props={{
                    href: '#merch',
                    child: <p>Merch</p>,
                    isExternal: false,
                    className: "px-4 py-2 bg-bg-700 border border-bg-500 rounded-md font-medium hover:bg-bg-500 transition-all"
                  }} />
                  <Link props={{
                    href: '#gallery',
                    child: <p>Gallery</p>,
                    isExternal: false,
                    className: "px-4 py-2 bg-bg-700 border border-bg-500 rounded-md font-medium hover:bg-bg-500 transition-all"
                  }} />
                </div>
              </div>
            </div>
          </div>
          <div className="hidden lg:block space-y-2">
            <h3 className="font-gains text-6xl font-medium tracking-tight text-center">Upcoming Games</h3>
            <Picker titles={titles} onTap={function (idx: number): void {
              setIndex(idx)
            }} />
            <div className="grid place-items-center">
              <EventCell2 event={scheduleData.body[index].nextEvent!} isPrevious={false} />
            </div>
          </div>
        </div>
      </div>
      <div id="schedule" className="pt-16">
        <Label title={'Schedule'} />
        <div className="w-screen flex items-center justify-center flex-shrink-0">
          <div className="max-w-[1400px] px-4 lg:px-20 md:px-10 w-screen">
            <Schedule seasonNodes={scheduleData.body} />
          </div>
        </div>
      </div>
      <div id="merch" className="pt-16">
        <Label title={'Merch'} />
        <BoundsWrapper>
          <div className="space-y-4">
            <MerchView products={products.slice(0, 3)} />
            <div className="text-right text-txt-300 hover:text-txt transition-colors">
              <Link props={{
                href: '/merch',
                child: <>More Merch &rarr;</>,
                isExternal: false,
              }} />
            </div>
          </div>
        </BoundsWrapper>
      </div>
      <div id="gallery" className="pt-16">
        <Label title={'Gallery'} />
        <BoundsWrapper>
          <div className="space-y-4">
            <ImageView images={imageData.body.slice(0, 4)} />
            <div className="text-right text-txt-300 hover:text-txt transition-colors">
              <Link props={{
                href: '/gallery',
                child: <>More Photos &rarr;</>,
                isExternal: false,
              }} />
            </div>
          </div>
        </BoundsWrapper>
      </div>
    </div>
  </>
}

export default Home

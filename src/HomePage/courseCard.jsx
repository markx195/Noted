import React, {useState} from "react"
import {data} from "../data/data"
import {LoadingCard} from "../loadingCard"
import InfiniteScroll from "react-infinite-scroll-component"

const CourseCard = () => {
    const [dataSource, setDataSource] = useState(data)
    const [hasMore, setHasMore] = useState(data)
    const fetchData = () => {
        if (dataSource.length < 200) {
            setTimeout(() => {
                setDataSource(dataSource.concat(Array.from({length: 6})))
            }, 500)
        } else {
            setHasMore(false)
        }
    }
    return (<>
            <div className="border border-solid border-[#D5D5D5] max-w-[1762px] mx-auto">
            </div>
            <div className="flex flex-wrap py-10 gap-4 px-[79px]">
                <button className="h-[39px] hover:bg-[#2F2E2E] border-[#D5D5D5] rounded-lg hover:text-[#F0C528]">Tất cả
                    khóa học
                </button>
                <button className="h-[39px] hover:bg-[#2F2E2E] border-[#D5D5D5] rounded-lg hover:text-[#F0C528]">Kỹ năng
                    làm việc
                </button>
                <button className="h-[39px] hover:bg-[#2F2E2E] border-[#D5D5D5] rounded-lg hover:text-[#F0C528]">Kỹ năng
                    quản lý
                </button>
                <button className="h-[39px] hover:bg-[#2F2E2E] border-[#D5D5D5] rounded-lg hover:text-[#F0C528]">Chuyên
                    môn Dev
                </button>
                <button className="h-[39px] hover:bg-[#2F2E2E] border-[#D5D5D5] rounded-lg hover:text-[#F0C528]">Chuyên
                    môn Test
                </button>
                <button className="h-[39px] hover:bg-[#2F2E2E] border-[#D5D5D5] rounded-lg hover:text-[#F0C528]">Scrum
                    master
                </button>
                <button className="h-[39px] hover:bg-[#2F2E2E] border-[#D5D5D5] rounded-lg hover:text-[#F0C528]">Chuyên
                    môn Hr
                </button>
            </div>

            {/*courses component*/}
            <InfiniteScroll dataLength={dataSource.length} next={fetchData} hasMore={hasMore} endMessage={<p>Đã hết</p>}
                            loader={<LoadingCard/>}>
                <div className='grid grid-cols-2 lg:grid-cols-4 gap-6 pt-4 max-w-[1762px] mx-auto'>
                    {dataSource.map((item, index) => (
                        <div
                            key={index}
                            className='border shadow-lg rounded-lg hover:scale-105 duration-300'
                        >
                            <div className="p-4">
                                <img
                                    src={item?.image}
                                    alt={item?.name}
                                    className='w-full rounded h-[150px] object-cover rounded-t-lg'
                                />
                            </div>

                            <p className='font-bold flex justify-between px-4 pb-4 text-sm'>{item?.name}</p>
                            <div className="px-4 pb-4">
                                <button
                                    className="h-[39px] w-full hover:bg-[#F0C528] border-[#D5D5D5] rounded-lg hover:text-[#2F2E2E] border-[#F0C528]">
                                    Tham gia khóa học
                                </button>
                            </div>
                            <div className='flex justify-between px-4 pb-4 text-sm'>
                                <p className=''>Link: {item?.name}</p>
                                <p>
                <span className='bg-orange-500 text-white p-1 rounded-full'>
                  {item.price}
                </span>
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </InfiniteScroll>
        </>
    );
}
export default CourseCard

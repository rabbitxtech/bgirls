import PageLoader from '@/app/components/loader/PageLoader'

const Loading = () => {
  return (
    <div className='absolute w-full h-[100vh] flex justify-end items-center'>
      <PageLoader />
    </div>
  )
}

export default Loading

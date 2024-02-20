import React, { useRef } from 'react'
import './main.scss'
import { instance as axios } from '../../utils/axios'
import parse from 'html-react-parser';
import getUserSession from '../../utils/decode';
import Protected from '../../layouts/Protected';
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown, faSignOut } from '@fortawesome/free-solid-svg-icons'
import ReactLoading from "react-loading";
import { debounce } from 'lodash';

const Main = () => {

    const [page, setPage] = React.useState(1)
    const [jobs, setJobs] = React.useState([])
    const [s_job, setSelectedJob] = React.useState(null)
    const [description, setDescription] = React.useState('')
    const [location, setLocation] = React.useState('')
    const [full_time, setFulltimeFlag] = React.useState(false)
    const [notFound, setNotFound] = React.useState(false)
    const [session, setSession] = React.useState(null)
    const [allowFetch, setAllowFetch] = React.useState(true)
    const [dispSubmenu, setDispSubmenu] = React.useState(false)
    const [isFetching, setIsFetching] = React.useState(false)

    const jobsDiv = useRef(null)

    const navigate = useNavigate()

    React.useEffect(() => {
        setSession(getUserSession())
    }, [])

    React.useEffect(() => {
        if(jobs.length == 0) {
            getJobsList({
                page: 1,
                description: '',
                location: '',
                full_time: false
            })
        }
    }, [jobs])

    const getJobsList = (params = {
        page,
        description,
        location,
        full_time,
    }) => {
        setIsFetching(true)
        axios.get('positions.json', {
            params
        })
        .then(r => {
            if(Array.isArray(r.data) && r.data.length) {
                const data = r.data.filter(item => { return item != null })
                setJobs(data)
                setSelectedJob(data[0])
                if(!data.length) {
                    setNotFound(true)
                }
                setIsFetching(false)
            }
        })
    }

    const setJobToDisplay = j => {
        setSelectedJob(j)
    }

    const handleInputChange = debounce((value, setter) => {
        console.log(value)
        setter(value)
    }, 500)

    const onSearch = async e => {
        e.preventDefault()
        setNotFound(false)
        setPage(1)
        setAllowFetch(true)
        getJobsList({
            page: 1,
            description,
            location,
            full_time,
        })
        jobsDiv.current.scrollTop = 0
    }

    const handleScroll = e => {
        const { scrollTop, scrollHeight, clientHeight } = e.target;
        const pos = scrollTop / (scrollHeight - clientHeight) * 100
        if(pos >= 85 && allowFetch) {
            setAllowFetch(false)
            setIsFetching(true)
            axios.get('positions.json', {
                params: {
                    page: page + 1,
                    description,
                    location,
                    full_time
                }
            })
            .then(r => {
                if(Array.isArray(r.data) && r.data.length) {
                    const data = r.data.filter(item => { return item != null })
                    setJobs(prevState => [
                        ...prevState, ...data
                    ])
                    setAllowFetch(true)
                    setPage(page + 1)
                }
            })
            .catch(e => {
                if(e.code === 'ERR_NETWORK') {
                    console.warn('end of pagination')
                }
            })
            .finally(() => {
                setIsFetching(false)
            })
        }
    }

    const logout = () => {
        localStorage.removeItem('user-session')
        navigate("/login")
    }

    return (
        <Protected>
            <div className='container'>
                <div className='nav-container'>
                    <div className='nav-container__navbar'>
                        <img src='https://alexharkness.com/wp-content/uploads/2020/06/logo-2.png' alt='main-logo' />
                        <div
                            onClick={() => setDispSubmenu(!dispSubmenu)} 
                            className='nav-container__navbar__end'>
                            <img src={session?.picture}></img>
                            <span>
                                { session?.name }
                                <FontAwesomeIcon icon={faCaretDown} />
                            </span>
                            
                            {
                                dispSubmenu && (
                                    <div className='nav-container__navbar__end__submenu'>
                                        <button 
                                            onClick={logout}
                                            className='nav-container__navbar__end__submenu__item'>
                                            <FontAwesomeIcon icon={faSignOut} />
                                            <span>logout</span>
                                        </button>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                    <form
                        onSubmit={onSearch} 
                        className='filter'>
                        {/* <input 
                            onChange={e => setDescription(e.target.value)}
                            placeholder='Filter by job title' /> */}
                        <input 
                            onChange={e => handleInputChange(e.target.value, setDescription)}
                            placeholder='Filter by job title or company' />
                        <input  
                            onChange={e => setLocation(e.target.value)}
                            placeholder='Filter by job location'/>
                        <label>
                            <input 
                                onChange={() => setFulltimeFlag(!full_time)}
                                checked={full_time}
                                type="checkbox"/>
                            Full time only
                        </label>
                        <button type="submit">Search</button>
                    </form>
                </div>
                <div className='content'>
                    <div
                        
                        className='jobs-list'>
                        <div className='jobs-list__title'>
                            {
                                !notFound ? 
                                    <p>Jobs curated for you</p> : (
                                    <>
                                        <p>Oops !</p>
                                        <p>We don't have any jobs matching that search right now. However, we have a list of jobs that might interest you below</p>
                                    </>
                                )
                            }
                            {/* <p>Oops !</p>
                            <p>We don't have any jobs matching that search right now. However, we have a list of jobs that might interest you below</p> */}
                        </div>
                        <div
                            ref={jobsDiv}
                            onScroll={handleScroll}  
                            className='jobs-list__curation'>
                            {
                                jobs.map(job => {
                                    return (
                                        <div
                                            onClick={() => setJobToDisplay(job)}
                                            className='job-card' 
                                            key={job.id}>
                                            <img
                                                onError={e => e.target.src = 'https://cdn.iconscout.com/icon/free/png-256/free-broken-image-1782063-1513075.png'}
                                                alt='logo' 
                                                src={job.company_log || 'https://cdn.iconscout.com/icon/free/png-256/free-broken-image-1782063-1513075.png'}>
                                            </img>
                                            <div className='job-card__detail'>
                                                <strong>{ job.title }</strong>
                                                <div className='job-card__detail__company'>
                                                    <a 
                                                        target='_blank' 
                                                        href={job.company_url}>
                                                        { job.company }
                                                    </a>
                                                    <p>{ job.location }</p>
                                                </div>
                                                <p>{ job.type }</p>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                            {
                                isFetching && (
                                    <div className='jobs-list__loading-container'>
                                        <ReactLoading type="bubbles" color="#3685FE" />
                                    </div>
                                )
                            }
                        </div>
                    </div>
                    <div className='job-display'>
                        <img src='https://s3-ap-northeast-1.amazonaws.com/media-storage-kalibrr/job-function-banners/IT_and_Software.png'/>
                        {/* <div className='job-display__header'></div> */}
                        <div className='job-display__content'>
                            <div className='job-display__company-logo'>
                                <img
                                    onError={e => e.target.src = 'https://cdn.iconscout.com/icon/free/png-256/free-broken-image-1782063-1513075.png'}
                                    alt='logo' 
                                    src={s_job?.company_logo || 'https://cdn.iconscout.com/icon/free/png-256/free-broken-image-1782063-1513075.png'}>
                                </img>
                            </div>
                            <div className='job-display__content__start'>
                                <h1>{ s_job?.title }</h1>
                                <div className='job-card__detail__company'>
                                    <a 
                                        target='_blank' 
                                        href={s_job?.company_url}>
                                        { s_job?.company }
                                    </a>
                                    <p>{ s_job?.location }</p>
                                </div>
                            </div>
                            <p>Posted on { s_job?.created_at }</p>
                            
                        </div>
                        <div className='job-display__detail'>
                            <h2>Job Description</h2>
                            <div className='job-display__detail__container'>
                                <div className='job-display__detail__start'>
                                    { parse(s_job?.description || '') }
                                </div>
                                <div className='job-display__detail__apply-box'>
                                    <div className='job-display__detail__apply-box__content'>
                                        <strong>How to Apply</strong>
                                    </div>
                                    <div className='job-display__detail__apply-box__content'>
                                        { parse(s_job?.how_to_apply || '') }
                                    </div>
                                </div>
                            </div>
                            
                            {/* <h2>How to Apply</h2>
                            { parse(s_job?.how_to_apply || '') } */}
                        </div>
                    </div>
                </div>
            </div>
        </Protected>
    )
}

export default Main
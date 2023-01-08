import React,{useState,useEffect} from 'react'
import { useNavigate ,useParams } from 'react-router-dom'

function UpdateUser() {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [age, setAge] = useState('')
    const [address, setAddress] = useState('')
    const [image, setImage] = useState()
    const [error, setError] = useState('')
    const [imageUrl,setImageUrl] = useState('')
    const navigate = useNavigate()
    const params = useParams()




    useEffect(() => {
        async function getData() {
            console.log(params);
            let result = await fetch(`http://localhost:3001/profile/${params.id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    authorization: JSON.parse(localStorage.getItem('AdminToken'))
                }
            })
            result.json().then((result) => {
                console.log(result)
                setName(result.name)
                setEmail(result.email)
                setAge(result.age)
                setAddress(result.address)
                setImageUrl(result?.imageUrl)
            }).catch((e) => {
                navigate('/notFound')
                console.log('error', e);
            })
        }
        getData()// eslint-disable-next-line
    }, [])




    const handleSubmit = () => {
        if (!name || !email) {
            setError('Email and Name is needed')
            return false
        }
        if (age && age < 1) {
            setError('Invalid Age')
            return false
        }
        setError('')

        const formData = new FormData();
        if (name) {
            formData.append("name", name);
        }
        if (email) {
            formData.append("email", email);
        }
        if (age) {
            formData.append("age", age);
        }
        if (address) {
            formData.append("address", address);
        }
        if (image) {
            formData.append("image", image);
        }
        for (var key of formData.entries()) {
            console.log(key[0] + ', ' + key[1]);
        }

        fetch(`http://localhost:3001/profile/${params.id}`, {
            method: 'put',
            body: formData,
            headers: {
                authorization: `${JSON.parse(localStorage.getItem("AdminToken"))}`,
            },
        })
            .then((result) => {
                console.log(result.status)
                if (result.status !== 200) {
                    console.log('error')
                    navigate('/notFound')
                } else {
                    result.json().then((result) => {
                        if (result.success) {
                            alert('Profile successfully Updated')
                        } else {
                            alert('Profile updation Unsuccessfull')
                        }
                    })
                }
            })
            .catch((e) => {
                console.log(e);
            })

        console.log(name, email, age, address)
    }

    //Input type file js
    var inputs = document.querySelectorAll('.file-input')

    for (var i = 0, len = inputs.length; i < len; i++) {
        customInput(inputs[i])
    }

    function customInput(el) {
        const fileInput = el.querySelector('[type="file"]')
        const label = el.querySelector('[data-js-label]')

        fileInput.onchange =
            fileInput.onmouseout = function () {
                if (!fileInput.value) return
                // eslint-disable-next-line
                var value = fileInput.value.replace(/^.*[\\\/]/, '')
                el.className += ' -chosen'
                label.innerText = value
            }
    }


    return (
        <div className='profile'>
            {/* <h1 style={{ textAlign: 'center' }}>Update Profile</h1> */}
            {
                imageUrl ?
                <img className='profile-photo' src={image ? URL.createObjectURL(image) : `http://localhost:3001/${imageUrl}` } alt="" />
                :
                <img className='profile-photo' src={image ? URL.createObjectURL(image) : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"  } alt="" />
            }

            <div className="file-input">
                <input type="file" onChange={e => setImage(e.target.files[0])} />
                <span className="button">Choose</span>
                <span className="label" data-js-label>No file selected
                </span>
            </div>

            <div className='profile-box'>
                <div className='input-div'>
                    <label className='label' htmlFor="name">Name</label>
                    <input className='input-update' type="text" onChange={(e) => setName(e.target.value)} value={name} name="name" id="name" />
                </div>
                <div className='input-div'>
                    <label htmlFor="email">Email</label>
                    <input className='input-update' type="email" onChange={(e) => setEmail(e.target.value)} value={email} name="email" id="email" />
                </div>
                <div className='input-div'>
                    <label htmlFor="age">Age</label>
                    <input className='input-update' type="number" onChange={(e) => setAge(e.target.value)} value={age} name="age" id="age" />
                </div>
                <div className='input-div'>
                    <label htmlFor="address">Address</label>
                    <textarea className='input-update' onChange={(e) => setAddress(e.target.value)} value={address} name="address" id="address" cols="30" rows="2"></textarea>
                </div>
                <h4 s className='error'>{error}</h4>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <button className='update-btn' onClick={handleSubmit}>Update Profile</button>
                </div>
            </div>
        </div>
    )
}


export default UpdateUser
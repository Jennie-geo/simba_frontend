import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import profilebackground from '../assets/profilebackground.svg';
import addavatar from '../assets/addavatar.png';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import { useAuth } from '../context/auth/AuthState';
import FileInput from '../components/common/FileInput';
import { ErrorToast } from '../utils/toast';
import UserUpdated from '../components/modal/UserUpdated';
import Modal from '../components/common/Modal';
import { BsCameraFill } from 'react-icons/bs';
import validator from 'validator';
import {
    Center,
    AuthFormArea,
    Container,
    InputWidth,
    MarginStyle,
} from '../utils/common';
import { apiPatch, apiGet } from '../utils/apiHelper';
const ProfileDiv = styled.div`
  width: 1084px;
  height: 100vh;
  left: 318px;
  top: 110px;
  background: #ffffff;
  border-radius: 4px;
`;
const ProfileCoverImg = styled.img`
  width: 1084px;
  height: 165px;
  left: 318px;
  top: 110px;
  object-fit: cover;
  border: none;
  background: url(${profilebackground}), rgba(0, 0, 0, 0.05);
  cursor: pointer;
`;
const ProfileUserImg = styled.img`
  top: 45px;
  width: 210px;
  height: 210px;
  border-radius: 50%;
  cursor: pointer;
   background:url(${addavatar}),  #c4c4c4;
  //background: #c4c4c4;
  border: 2px solid green;
  object-fit: cover;
  position: absolute;
  left: 0;
  right: 0;
  margin: 80px;
  margin-left: 110px;
  margin-bottom: 30px;
`;
const ProfileInfo = styled.div`
  margin-left: -25px;
  margin-top: -200px;
  position: absolute;
`;
const Heading4div = styled.div`
  width: 202px;
  height: 40px;
  left: 604px;
  top: 287px;
`;
const Heading6div = styled.div`
  width: 106px;
  height: 18px;
  left: 604px;
  top: 333px;
`;
const Heading4 = styled.h5`
  font-family: Mulish;
  font-style: normal;
  font-weight: bold;
  font-size: 32px;
  line-height: 40px;
  color: #000000;
`;
const Heading6 = styled.h6`
  font-family: Mulish;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 18px;
`;
const UserProfile = () => {
    const [userData, setUserData] = useState({
        fullName: '',
        dateOfBirth: '',
        address: '',
        email: '',
        bvn: '',
        phone: '',
        nextOfKin: '',
        nin: '',
        Uploadiddocument: '',
        Uploadletterofacceptance: '',
        termsAndConditionUrl: '',
        loanRestructureUrl: '',
        avatarUrl: '',
        title: '',
    });
    const [errors, setErrors] = useState({
        fullName: '',
        dateOfBirth: '',
        address: '',
        email: '',
        bvn: '',
        phone: '',
        nextOfKin: '',
        nin: '',
        Uploadiddocument: '',
        Uploadletterofacceptance: '',
        termsAndConditionUrl: '',
        loanRestructureUrl: '',
    });
    const { user } = useAuth();
    const [showModal, setShowModal] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const [userId, setUserId] = useState('');
    const toggleModal = () => setShowModal(!showModal);
    useEffect(() => {
        apiGet(`/user/member/${user.id}`)
            .then((res) => {
                const userData = res.data.data;
                const prefillData = {
                    email: userData.email,
                    fullName: userData.fullName,
                    phone: userData.phoneNumber,
                    address: userData.address,
                    dateOfBirth: userData.dateOfBirth,
                    bvn: userData.bvn,
                    nextOfKin: userData.nextOfKin,
                    nin: userData.nin,
                    avatarUrl: userData.avatarUrl,
                    title: userData.title,
                };
                setUserData(prefillData);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);
    const changeHandler = (e) => {
        const { name, value } = e.target;
        setUserData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };
    const validateFullName = () => {
        if (
            !new RegExp(
                /^([A-Za-z]{3,16})([ ]{1})([A-Za-z]{3,16})?([ ]{1})?([A-Za-z]{3,16})$/
            ).test(userData.fullName)
        ) {
            setErrors((prevState) => ({
                ...prevState,
                fullName: 'Enter a valid fullname',
            }));
            return false;
        } else {
            setErrors((prevState) => ({
                ...prevState,
                fullName: '',
            }));
            return true;
        }
    };
    const validateDateOfBirth = () => {
        const age =
            new Date().getFullYear() - new Date(userData.dateOfBirth).getFullYear();
        if (!validator.isDate(userData.dateOfBirth) || age < 10) {
            setErrors((prevState) => ({ ...prevState, dateOfBirth: 'Invalid Date' }));
            return false;
        } else {
            setErrors((prevState) => ({
                ...prevState,
                dateOfBirth: '',
            }));
            return true;
        }
    };
    const validateaddress = () => {
        if (userData.address.length <= 4) {
            setErrors((prevState) => ({
                ...prevState,
                address: 'Enter a valid address',
            }));
            return false;
        } else {
            setErrors((prevState) => ({
                ...prevState,
                address: '',
            }));
            return true;
        }
    };
    const validatephone = () => {
        if (userData.phone.length !== 11 || !userData.phone.startsWith('0')) {
            setErrors((prevState) => ({
                ...prevState,
                phone: 'Enter a valid phone',
            }));
            return false;
        } else {
            setErrors((prevState) => ({
                ...prevState,
                phone: '',
            }));
            return true;
        }
    };
    const validateEmail = () => {
        if (
            !new RegExp(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            ).test(userData.email)
        ) {
            setErrors((prevState) => ({
                ...prevState,
                email: 'Enter a valid email',
            }));
            return false;
        } else {
            setErrors((prevState) => ({
                ...prevState,
                email: '',
            }));
            return true;
        }
    };
    const validateBvn = () => {
        if (userData.bvn.length != 11) {
            setErrors((prevState) => ({
                ...prevState,
                bvn: 'Enter a valid Bvn number',
            }));
            return false;
        } else {
            setErrors((prevState) => ({
                ...prevState,
                bvn: '',
            }));
            return true;
        }
    };
    const validateNextOfKin = () => {
        if (
            !new RegExp(
                /^([A-Za-z]{3,16})([ ]{1})([A-Za-z]{3,16})?([ ]{1})?([A-Za-z]{3,16})$/
            ).test(userData.nextOfKin)
        ) {
            setErrors((prevState) => ({
                ...prevState,
                nextOfKin: 'Enter a valid fullname',
            }));
            return false;
        } else {
            setErrors((prevState) => ({
                ...prevState,
                nextOfKin: '',
            }));
            return true;
        }
    };
    const validateNin = () => {
        if (userData.nin.length != 11) {
            setErrors((prevState) => ({
                ...prevState,
                nin: 'Enter a valid is not Bvn number',
            }));
            return false;
        } else {
            setErrors((prevState) => ({
                ...prevState,
                nin: '',
            }));
            return true;
        }
    };
    const validateFIleUrl = (file) => {
        if (!userData[file]) {
            setErrors((prevState) => ({ ...prevState, [file]: 'Select a file' }));
            return false;
        } else {
            setErrors((prevState) => ({ ...prevState, [file]: '' }));
            return true;
        }
    };
    const validateInput = () => {
        const valid =
            validateaddress() &&
            validateBvn() &&
            validateNextOfKin() &&
            validateNin() &&
            validateFIleUrl('Uploadiddocument') &&
            validateFIleUrl('Uploadletterofacceptance') &&
            validateFIleUrl('termsAndConditionUrl') &&
            validateFIleUrl('loanRestructureUrl');
        return valid;
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        if (validateInput()) {
            await apiPatch('/user/update-profile', userData, {}, true).then(
                (res) => {
                    setUserId(res.data.data);
                    setShowSuccess(true);
                    setLoading(false);
                },
                (err) => {
                    if (!err.response) {
                        ErrorToast('Something went wrong');
                    } else {
                        ErrorToast(err.response.data.message);
                    }
                    setLoading(false);
                }
            );
        } else {
            setLoading(false);
        }
    };
    if (showSuccess) {
        return <UserUpdated userId={userId && userId} />;
    }
    return (
        <Center style={{ height: '100%' }}>
            <ProfileDiv>
                <ProfileCoverImg>
                </ProfileCoverImg>
                <ProfileInfo>
                    <ProfileUserImg onClick={() => toggleModal()} />
                    <div style={{ marginLeft: '350px', marginTop: '210px' }}>
                        <Heading4div>
                            <Heading4>{user.fullname.split(' ')[0]}</Heading4>
                        </Heading4div>
                        <Heading6div>
                            <Heading6>{userData.title}</Heading6>
                        </Heading6div>
                    </div>
                </ProfileInfo>
                <AuthFormArea style={{ width: '100%', marginTop: '120px' }}>
                    <form onSubmit={handleSubmit}>
                        <Container>
                            <InputWidth>
                                <Input
                                    autoComplete="off"
                                    type="text"
                                    label="Full Name"
                                    name="fullName"
                                    value={userData.fullName}
                                    onChange={changeHandler}
                                    // onBlur={validateFullName}
                                    // errorMessage={errors.fullName}
                                    style={{ background: 'rgba(246, 246, 246, 0.49)' }}
                                    isTrueOrFalse={true}
                                    disabled={true}
                                />
                            </InputWidth>
                            <InputWidth>
                                <Input
                                    autoComplete="off"
                                    type="date"
                                    label="Date of Birth"
                                    name="dateOfBirth"
                                    value={userData.dateOfBirth}
                                    onChange={changeHandler}
                                    // onBlur={validateDateOfBirth}
                                    // errorMessage={errors.dateOfBirth}
                                    style={{ background: 'rgba(246, 246, 246, 0.49)' }}
                                    disabled={true}
                                />
                            </InputWidth>
                        </Container>
                        <Container>
                            <InputWidth>
                                <Input
                                    autoComplete="off"
                                    type="text"
                                    label="Address"
                                    name="address"
                                    value={userData.address}
                                    onChange={changeHandler}
                                    onBlur={validateaddress}
                                    errorMessage={errors.address}
                                    style={{ background: 'rgba(246, 246, 246, 0.49)' }}
                                />
                            </InputWidth>
                            <InputWidth>
                                <Input
                                    autoComplete="off"
                                    type="email"
                                    label="Email"
                                    name="email"
                                    value={userData.email}
                                    onChange={changeHandler}
                                    // onBlur={validateEmail}
                                    // errorMessage={errors.email}
                                    style={{ background: 'rgba(246, 246, 246, 0.49)' }}
                                    disabled={true}
                                />
                            </InputWidth>
                        </Container>
                        <Container>
                            <InputWidth>
                                <Input
                                    autoComplete="off"
                                    type="text"
                                    label="BVN"
                                    name="bvn"
                                    value={userData.bvn}
                                    onChange={changeHandler}
                                    onBlur={validateBvn}
                                    errorMessage={errors.bvn}
                                    style={{ background: 'rgba(246, 246, 246, 0.49)' }}
                                />
                            </InputWidth>
                            <InputWidth>
                                <Input
                                    type="tel"
                                    label="Phone Number"
                                    name="phone"
                                    value={userData.phone}
                                    onChange={changeHandler}
                                    // onBlur={validatephone}
                                    // errorMessage={errors.phone}
                                    style={{ background: 'rgba(246, 246, 246, 0.49)' }}
                                    disabled={true}
                                />
                            </InputWidth>
                        </Container>
                        <Container>
                            <InputWidth>
                                <Input
                                    autoComplete="off"
                                    type="text"
                                    label="Next of Kin"
                                    name="nextOfKin"
                                    value={userData.nextOfKin}
                                    onChange={changeHandler}
                                    onBlur={validateNextOfKin}
                                    errorMessage={errors.nextOfKin}
                                    style={{ background: 'rgba(246, 246, 246, 0.49)' }}
                                />
                            </InputWidth>
                            <InputWidth>
                                <Input
                                    autoComplete="off"
                                    type="text"
                                    label="NIN"
                                    name="nin"
                                    value={userData.nin}
                                    onChange={changeHandler}
                                    onBlur={validateNin}
                                    errorMessage={errors.nin}
                                    style={{ background: 'rgba(246, 246, 246, 0.49)' }}
                                />
                            </InputWidth>
                        </Container>
                        <Container>
                            <InputWidth>
                                <FileInput
                                    label="Upload ID Document"
                                    name="Uploadiddocument"
                                    errorMessage={errors.Uploadiddocument}
                                    value={userData.Uploadiddocument}
                                    onChange={(e) => changeHandler(e)}
                                    onBlur={() => validateFIleUrl('Uploadiddocument')}
                                    style={{ background: 'rgba(246, 246, 246, 0.49)' }}
                                />
                            </InputWidth>
                            <InputWidth>
                                <FileInput
                                    label="Upload Letter Of Acceptance"
                                    name="Uploadletterofacceptance"
                                    errorMessage={errors.Uploadletterofacceptance}
                                    value={userData.Uploadletterofacceptance}
                                    onChange={(e) => changeHandler(e)}
                                    onBlur={() => validateFIleUrl('Uploadletterofacceptance')}
                                    style={{ background: 'rgba(246, 246, 246, 0.49)' }}
                                />
                            </InputWidth>
                        </Container>
                        <Container>
                            <InputWidth>
                                <FileInput
                                    label="Signed terms and Conditions document"
                                    name="termsAndConditionUrl"
                                    errorMessage={errors.termsAndConditionUrl}
                                    value={userData.termsAndConditionUrl}
                                    onChange={(e) => changeHandler(e)}
                                    onBlur={() => validateFIleUrl('termsAndConditionUrl')}
                                    style={{ background: 'rgba(246, 246, 246, 0.49)' }}
                                />
                            </InputWidth>
                            <InputWidth>
                                <FileInput
                                    label="Loan Structure/Rental"
                                    name="loanRestructureUrl"
                                    errorMessage={errors.loanRestructureUrl}
                                    value={userData.loanRestructureUrl}
                                    onChange={(e) => changeHandler(e)}
                                    onBlur={() => validateFIleUrl('loanRestructureUrl')}
                                    style={{ background: 'rgba(246, 246, 246, 0.49)' }}
                                />
                            </InputWidth>
                        </Container>
                        <MarginStyle>
                            <Button
                                style={{ marginTop: '42px', width: '100%' }}
                                type="submit"
                            >
                                Save
                            </Button>
                        </MarginStyle>
                    </form>
                </AuthFormArea>
                <Modal
                    title="Upload Avatar"
                    isOpen={showModal}
                    closeModal={toggleModal}
                >
                    <InputWidth style={{ width: '80%' }}>
                        <FileInput
                            name="avatar"
                            value={userData.avatarUrl}
                            onChange={(e) => changeHandler(e)}
                            style={{ background: 'rgba(246, 246, 246, 0.49)', width: '80%' }}
                        />
                    </InputWidth>
                    <Button style={{ marginTop: '42px', width: '40%' }} type="submit">
                        Upload
                    </Button>
                </Modal>
            </ProfileDiv>
        </Center>
    );
};
export default UserProfile;
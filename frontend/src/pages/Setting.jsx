import Helmet from '../components/Helmet/Helmet'
import UserSetting from '../components/UI/UserSetting'
// import ProfileUi from '../components/UI/ProfileUi'
// import UserSetting from '../components/UI/UserSetting' '../components/UI/UserSetting'
function Setting() {
    return (
        <Helmet title="setting">
            {/* <ProfileUi /> */}
            <UserSetting />
        </Helmet>
    )
}

export default Setting
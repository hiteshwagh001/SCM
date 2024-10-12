import Helmet from '../components/Helmet/Helmet'
// import ProfileUi from '../components/UI/ProfileUi'
import UserDashboard from '../components/UI/UserDashboard'
function Profile() {
    return (
        <Helmet title="profile">
            {/* <ProfileUi /> */}
            <UserDashboard />
        </Helmet>
    )
}

export default Profile
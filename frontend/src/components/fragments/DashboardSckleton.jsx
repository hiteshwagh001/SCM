import ContentLoader from "react-content-loader"

const DashboardSckleton = (props) => (
    <ContentLoader
        speed={2}
        width={476}
        height={600}
        viewBox="0 0 476 124"
        backgroundColor="#ededed"
        foregroundColor="#ecebeb"
        {...props}
    >
        <rect x="67" y="5" rx="0" ry="0" width="89" height="125" />
        <rect x="171" y="10" rx="0" ry="0" width="86" height="21" />
        <rect x="274" y="10" rx="0" ry="0" width="86" height="21" />
        <rect x="171" y="37" rx="0" ry="0" width="86" height="21" />
        <rect x="274" y="37" rx="0" ry="0" width="86" height="21" />
        <rect x="171" y="62" rx="0" ry="0" width="86" height="21" />
        <rect x="273" y="63" rx="0" ry="0" width="86" height="21" />
        <rect x="171" y="91" rx="0" ry="0" width="190" height="32" />
    </ContentLoader>
)

export default DashboardSckleton;
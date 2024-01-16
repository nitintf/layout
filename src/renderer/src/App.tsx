import { Content, DraggableTopBar, RootLayout, Sidebar } from './components'
import { NavBarItem } from './components/NavBarItem'
import { PiCommandFill } from 'react-icons/pi'
import { RiSettings2Fill } from 'react-icons/ri'

function App(): JSX.Element {
  return (
    <>
      <DraggableTopBar />
      <RootLayout>
        <Sidebar>
          <NavBarItem title="Commands" active={false} icon={<PiCommandFill />} />
          <NavBarItem title="General" active={true} icon={<RiSettings2Fill />} />
        </Sidebar>
        <Content>Content</Content>
      </RootLayout>
    </>
  )
}

export default App

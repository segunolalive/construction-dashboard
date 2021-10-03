import Container from 'components/Container'

import style from './layout.module.css'

type Props = {
  children: React.ReactNode
}

export default function Layout({ children }: Props) {
  return (
    <div className={style.page}>
      <main className={style.main}>
        <Container className={style.container}>{children}</Container>
      </main>
      <Container>
        <footer className={style.footer}>
          <span>Cosuno • Coding • Test</span>
        </footer>
      </Container>
    </div>
  )
}

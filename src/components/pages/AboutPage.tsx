import "./AboutPage.css"

export const AboutPage = () => {
  return (
    <div className="page-wrapper about">
      <h1>About</h1>
      <div className="content">
        <section>
          <p>
            <strong>
              Through this website, I share my music with the world.
            </strong>
          </p>
          <p>
            Since making music is primarily a hobby for me, everything you find
            here is free.
          </p>
          <p>You are allowed to:</p>
          <ul>
            <li>listen to my projects</li>
            <li>play the projects in public and private</li>
            <li>remix the projects</li>
            <li>sample the projects</li>
            <li>share the projects unchanged and with modifications</li>
            <li>integrate the projects into your creative process</li>
          </ul>

          <p>
            The only condition is that you mention me in your releases on
            Instagram either in a <strong>post, reel, or comment</strong>.
          </p>
          <p className="big">Have fun!</p>
        </section>

        <section className="technical-info">
          <h2>About the Website</h2>
          <p>
            This website a fun project of mine built in part with{" "}
            <strong>React</strong> and <strong>three.js</strong>.
          </p>
          <p>
            A special thanks goes out to the amazing developer collective{" "}
            <a href="https://pmnd.rs/" target="_blank">
              Poimandres
            </a>{" "}
            for providing libraries like{" "}
            <a
              href="https://www.npmjs.com/package/@react-three/fiber"
              target="_blank"
            >
              @react-three/fiber
            </a>{" "}
            and related helpers for 3D,{" "}
            <a
              href="https://www.npmjs.com/package/@react-spring/web"
              target="_blank"
            >
              @react-spring
            </a>{" "}
            for supersmooth web- and three.js - animations and{" "}
            <a href="https://www.npmjs.com/package/zustand" target="_blank">
              zustand
            </a>{" "}
            for straight forward state management.
          </p>
        </section>
      </div>
    </div>
  )
}

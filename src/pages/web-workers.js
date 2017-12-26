import React from 'react'
import { WebWorkersExample } from '../examples'
import { Hr, Heading } from '../components'
const WebWorkersPage = () => (
  <div>
    <Heading large>
      <h1>Web Workers</h1>
    </Heading>
    <p>
      Here will be some content on web workers and such...article on how to set
      up a web worker with example as live code!
    </p>

    <p>
      Eventually would be nice to do content in markdown files since that's
      faster...maybe actuallly pull in the examples through a graphql query or
      something akin to that.
    </p>

    <Hr />
    <section>
      <Heading>A brief outline for content</Heading>
      <br />
      <br />
      <ul>
        <li>What Are Web Workers and Why Do They Matter?</li>
        <li>How do you write a web worker?</li>
        <li>
          Writing a simple web worker in modern JS applications (i.e. React)
        </li>
        <li>
          Ways to safely operate with web workers (multi-threadedness design
          patterns)
          <ul>
            <li>
              Note: This will need to come a little while later after I've
              worked with them a little bit more
            </li>
          </ul>
        </li>
      </ul>
    </section>

    <Hr />
    <Heading>
      <h2>Example</h2>
    </Heading>
    <WebWorkersExample />
  </div>
)

export default WebWorkersPage

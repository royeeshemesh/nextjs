import axios from 'axios';
import { Component } from "react";
import Link from "next/link";
import Header from "../components/header";

class AboutPage extends Component {
  static async getInitialProps(appContext) {

    let result;

    console.info(appContext.query.id);

    try {
      const {data} = await axios.get(`https://swapi.co/api/people/${appContext.query.id || '1' }`);
      result = data;

    } catch (e) {
      console.info(e);
    }



    const isServer = typeof window === "undefined";
    return { isServer, result };
  }

  render() {
    const {result} = this.props;

    return (
      <main>
        <Header />
        <section>
          <p>
            This is another page of the SSR example, you accessed it{" "}
            <strong>{this.props.isServer ? "server" : "client"} side</strong>.
          </p>
          <p>
            You can reload to see how the page change.
          </p>
          <Link href="/">
            <a>Go to Home</a>
          </Link>

          <table border="1">
            <tbody>
            <tr>
              <td>name</td>
              <td>{result.name}</td>
            </tr>
            </tbody>
          </table>
        </section>
      </main>
    );
  }
}

export default AboutPage;
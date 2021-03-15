import { AboutPage } from "./about-page";
import { env } from "./_common";

export namespace CardBackSection {

  export const build = (t: any) => {

    return t.card('id', 'name')
      .then((card: any) => {
        if (card.name.toLowerCase().indexOf('test') < 0) {
          return null;
        }

        //else
        return {
          title: 'Hallpass Test',
          icon: env.logo.color,
          content: {
            type: 'iframe',
            url: t.sign('./card-back-section-test.md'),
            height: 300,
            action: {
              text: 'Card Detail',
              callback: AboutPage.showAboutCard
            }
          }
        };
      });

  };

}

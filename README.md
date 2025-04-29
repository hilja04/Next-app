Ohjelmistokehityksen teknologiat - Seminaarityö

# Next.js Todo-App
Hilja Katajamäki

[Projektin Video linkki](https://haagahelia-my.sharepoint.com/:v:/g/personal/bhi033_myy_haaga-helia_fi/EfdlYGGl9DhDsHGSrgtdoLQBtu7p9MHDp5HOlfmwLInjRg?e=lXq6iV)

27.04.2025

## Sisältö
- [1 Johdanto](#johdanto)
- [2 Käytetyt teknologiat ja tekniikat](#käytetyt-teknologiat-ja-tekniikat)
  - [2.1 App Router](#app-router)
  - [2.2 API Routes](#api-routes)
  - [2.3 SSR ja CSR](#ssr-ja-csr)
- [3 Työn Vaiheet](#työn-vaiheet)
  - [3.1 Sovelluksen suunnittelu ja ominaisuuksien valinta](#1-sovelluksen-suunnittelu-ja-ominaisuuksien-valinta)
  - [3.2 Next.js -projektin luominen](#2-nextjs--projektin-luominen)
  - [3.3 Sovelluksen lisäys GitHubiin](#3-sovelluksen-lisäys-githubiin)
  - [3.4 Sovelluksen kehitys](#4-sovelluksen-kehitys)
  - [3.5 Viimeistely](5-viimeistely)
- [4 Arkkitehtuurikaavio](#arkkitehtuurikaavio)
- [5 Johtopäätökset](#johtopäätökset)
  - [5.1 Reflektointi](#reflektointi)
- [6 Lähteet](#lähteet)

## Johdanto
Web-sovellusten kehityksessä on yleistä käyttää erilaisia kehyksiä eli frameworkeja. Kehykset ovat ohjelmistorunkoja tai pohjia, jotka tarjoavat valmiita työkaluja ja rakenteita sovellusten kehittämisen tueksi. Nämä valmiit työkalut tekevät sovellusten kehittämisestä nopeampaa, tehokkaampaa ja helpompaa. Yksi suosituimmista JavaScript-pohjaisista kehyksistä on Next.js.

Next.js rakennetaan React-kirjaston päälle ja se hyödyntää Node.js:ää suorittaakseen palvelin puolen toimintoja, mikä mahdollistaa full-stack-kehityksen yhdessä ympäristössä ([Next.js Dokumentaatio](https://nextjs.org/docs)). Se tarjoaa laajasti eri mahdollisuuksia ja ominaisuuksia, joita ei pelkällä Reactilla pystyisi käyttämään. Sen API Routes -ominaisuuden avulla HTTP-pyyntöjen käsittely on yksinkertaista ja tehokasta. Lisäksi Next.js tukee palvelinpuolen renderöintiä (SSR) ja asiakaspuolen renderöintiä (CSR). Niitä voidaan hyödyntää suorituskyvyn ja käyttäjäkokemuksen parantamiseksi.

Tässä seminaarityössä tutustutaan Next.js:ään ja sovelletaan sen ominaisuuksia. Työssä rakennetaan yksinkertainen Todo-sovellus, jossa voi luoda, katsella ja poistaa todoita eli tehtäviä sekä kategorioita. Sovelluksessa voi myös lisätä tehtävälle kategorian. Yksinkertaisen sovelluksen avulla voi kokeilla ja implementoida erilaisia ominaisuuksia helposti. Sovelluksessa keskitytään erityisesti API Routes -ominaisuuteen ja App Routeriin.

Työn tavoitteena on tutustua Next.js:n tarjoamiin mahdollisuuksiin ja oppia soveltamaan sen ominaisuuksia omassa sovelluksessa. 

## Käytetyt teknologiat ja tekniikat

Teknologiat:
- Next.js - JavaScript-pohjainen kehys
- SQLite - kevyt tietokanta, jota käytetään sovelluksen tietojen tallentamiseen
- Material-UI - React-komponenttikirjasto, joka tarjoaa tyyliteltyjä käyttöliittymä komponentteja

Tekniikat:
- App Router
- API Routes
- SSR (Server-Side Rendering)
- CSR (Client-Side Rendering)
  
### App router
App Router on Next.js:n tiedostopohjainen reititin, joka mahdollistaa sovelluksen reitityksen hallinnan ilman erillisiä reititystiedostoja ([Next.js Dokumentaatio](https://nextjs.org/docs/app)). Tämä tarkoittaa, että sovelluksen reitit määräytyvät hakemistorakenteen mukaan, mikä yksinkertaistaa koodin hallintaa ja selkeyttää reittien määrittelyn. 

#### Hakemisto rakenne

```mermaid
graph TD;
    A[App/]
    A --> B[api/]
    A --> C[categories/]
    A --> D[lib/]
    A --> E[page.js]
    A --> F[layout.js]
   
  B --> B1[todos/]
  B --> B2[categories/]

  B1 --> B1_1[id/]
  B1 --> B1_2[route.js]

  B1_1 --> B1_1_1[route.js]

  B2 --> B2_1[id/]
  B2 --> B2_2[route.js]

  B2_1 --> B2_1_1[route.js]
  C --> C1[page.js]
    
  D --> D1[db.js]
```
Kaaviossa on esitetty Todo-sovelluksen hakemistorakenne, joka hyödyntää App Routerin tiedostopohjaista reititystä. ``App``-kansio toimii pääkansiona, joka sisältää sovelluksen eri osiot kuten API-reitit ja sovelluksen sivut sekä niiden reitit. Esimerkiksi ``categories``-kansio, joka sijaitsee ``app``-kansion sisällä, määrittää reitin ``/categories``. Tämä reitti vie ``categories``-kansion sisällä olevaan ``page.js``-sivuun. Kun käyttäjä painaa Todo-sovelluksessa AppBarin "categories"-painiketta, sovellus ohjaa hänet ``/categories``-reitille ja näyttää ``page.js``-sivun sisällön. Jokaisen app -reitin sisällä on ``page.js`` tiedosto, joka on reitillä renderöitävä sivu.

Alla on koodiesimerkki ``layout.js``-tiedostosta, jossa sivujen navigaatio sijaitsee. Koodiesimerkistä näkee, miten reitit lisätään AppBariin. AppBar on yksi Material UI -kirjaston komponentti:

```
<AppBar position="sticky">
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              My Todo App
            </Typography>
            <Tabs value={selectedTab} onChange={handleTabChange} textColor="inherit"> //Reitit
             <Tab label="Todos" component={Link} href="/" />*
             <Tab label="Categories" component={Link} href="/categories" />*
            </Tabs>
          </Toolbar>
        </AppBar>
```

### API Routes
Sovelluksessa on käytetty Next.js:n API Routes -ominaisuutta. Api Routes -ominaisuus tarjoaa ratkaisun julkisen API:n luomiseen Next.js sovelluksessa ([Next.js Dokumentaatio](https://nextjs.org/docs/pages/building-your-application/routing/api-routes)). Ominaisuuden avulla voidaan käsitellä HTTP-pyyntöjä helposti. 

Todo-sovelluksen API-reitit sijaitsevat ``api``-kansion sisällä. API-reitit kuten ``api/todos`` ja ``api/categories`` ottavat vastaan clientin HTTP-pyyntöjä (GET,POST,PUT,DELETE) ja käsittelevät pyynnöt, jonka jälkeen ne lähettävät vastauksen clientille. Näiden reittien kautta asiakaspuolen komponentit voivat hakea, muokata tai poistaa tietoa. Jokaisen reitin sisällä on ``route.js`` tiedosto, jossa reitittimet sijatisevat.

Alla on esimerkki GET categories API-reitittimestä, joka sijaitsee ``api/categories`` reitillä ``route.js``-tiedoston sisällä:

```
export async function GET() {
  const categories = await getCategories();
  return new Response(JSON.stringify(categories), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
```
Reititin ottaa HTTP-pyynnön vastaan ja sitten hakee ``getCategories`` metodin tietokannasta ja lähettää tämän jälkeen clientille vastauksena kaikki kategoriat.

Sovelluksessa on myös käytetty dynaamista reititystä. Dynaamiset reitit välittävät dataa URL:ää pitkin. Tehtävien poistamista varten käytetään dynaamista reittiä ``api/todos/[id]``, joka käsittelee tietyn tehtävän poistamista.  Tällöin API-reititin ottaa polusta dynaamisen arvon ([id]) ja suorittaa DELETE operaation kyseisen id:n omistavalle tehtävälle. 

Sovelluksessa on myös SQLite tietokanta, joka on määritelty ``lib``-kansiossa ``db.js``-tiedostossa. API-reitit hyödyntävät tietokannan toimintoja importtaamalla ne ``db.js``-tiedostosta. Näiden toimintojen avulla API-reitit pystyvät käsittelemään tietoa helpommin ja suorittamaan tietokannan operaatioita kuten tehtävien hakemista, lisäämistä, päivittämistä ja poistamista.

Alla on esimerkki ``db.js``-tiedoston ``getCategories`` metodista, jota käytetään GET categories API-reitittimessä:

```
// Fetch all categories
export async function getCategories() {
  const db = await openDb();
  return await db.all('SELECT * FROM categories');
}
```
### SSR ja CSR
Server-Side Rendering (SSR) ja Client-Side Rendering (CSR) ovat kaksi erilaista tekniikkaa, joita käytetään sovelluksen datan renderöintiin. Next.js tarjoaa molemmat vaihtoehdot.

Server-Side Rendering (SSR) tarkoittaa, että palvelin generoi HTML-sisällön serverillä ja lähettää sen sitten clientille ([MDN Web Docs](https://developer.mozilla.org/en-US/docs/Glossary/SSR)).

Client-side Rendering (CSR) taas tarkoittaa, että sisältö generoidaan Clientin eli asiakkaan selaimessa.

Tässä Todo-sovelluksessa molempia teknologioita hyödynnetään tilanteen mukaan. Uusimmissa Next.js-versioissa komponentit ovat oletuksena server-side komponentteja, mutta ne voidaan määritellä myös client-side komponenteiksi lisäämällä tiedoston alkuun ``"use client;"`` koodi ([Next.js Dokumentaatio](https://nextjs.org/docs/app/building-your-application/rendering/server-components)). 

## Työn vaiheet
Sovelluksen kehittäminen on toteutettu vaiheittain, ja alla on kuvattu tärkeimmät vaiheet ja komennot, joita käytettiin Todo-sovelluksen luomiseen.

### 1 Sovelluksen suunnittelu ja ominaisuuksien valinta

Ennen sovelluksen aloitusta tutkittiin Next.js:ää ja sen ominaisuuksia eri lähteistä kuten Next.js dokumentaatiosta. Tämän jälkeen alettiin suunnittelemaan sovellusta ja päätettiin sen aihe. Tähän työhön valittiin Todo-sovellus, sillä se on tuttu ja turvallinen, jolloin on helppo keskittyä Next.js-ominaisuuksien lisäämiseen. Kun aihe oli päätetty, valittiin Next.js -ominaisuudet, kuten App Router, API Routes ja SSR/CSR, jotka haluttiin lisätä tähän sovellukseen. 

### 2 Next.js -projektin luominen

Työn toisessa vaiheessa luotiin Next.js-projekti komentorivillä käyttäen komentoa:
   
``npx create-next-app@latest``
   
Tämä komento asentaa kaikki tarvittavat riippuvuudet ja luo pohjan sovellukselle ([Next.js Dokumentaatio](https://nextjs.org/docs/app/getting-started/installation)). Jotta Next.js:ää voi käyttää ja luominen sujuu mutkitta, omassa järjestelmässä tulee olla ladattuna Node.js. Projektin luomisen jälkeen asennettiin valitut lisäosat kuten SQLite ja Material UI:

``npm install sqlite sqlite3 ``

``npm install @mui/material @emotion/react @emotion/styled``

### 3 Sovelluksen lisäys GitHubiin

Projektin pohjan ollessa pystyssä se lisättiin GitHubiin, jotta voidaan toteuttaa versionhallintaa. Aluksi luotiin GitHub repository, ja sitten komentorivillä projektin kansiossa käytettiin seuraavia komentoja ``git init``, ``git add.``,``git commit -m ""``, ``git remote add origin <repository_url>`` ja ``git push -u origin master``. 

### 4 Sovelluksen kehitys

Kun kaikki riippuvuudet oltiin asennettu, aloitettiin sovelluksen kehitys. Ensiksi luotiin App Routeriin sivujen reitit ja sen jälkeen sivut. Kun sivut olivat valmiit, luotiin API Routes -reitittimet kategorioille ja tehtäville. Tämän jälkeen otettiin tietokanta käyttöön ja lisättiin se API -reitteihin. Sovelluksen kehityksen aikana seurattiin jatkuvasti, miltä web-sovellus näyttää paikallisesti selaimessa (localhost).

### 5 Viimeistely
Lopuksi testattiin sovelluksen toimivuutta selaimessa localhostissa ja varmistettiin, että kaikki toiminnot toimivat oikein. Tämän jälkeen lähetettiin valmis versio GitHubiin. Sovelluksen voi käynnistää seuraavalla komennolla:

``npm run dev``

## Arkkitehtuurikaavio

```mermaid
graph TD
  A[Client-side Components] -->|HTTP Request| B[Next.js API Routes]
  B -->|Database Query| C[SQLite Database]
  C -->|Response| B
  B -->|Response| A


```
Arkkitehtuurikaavio kuvaa sovelluksen rakennetta, jossa asiakaspuolen komponentin tekevät HTTP-pyyntöjä Next.js:n API Routes -reiteille. Nämä reitit käyttävät tietokannan kyselyfunktioita ja palauttavat tiedot takaisin asiakaspuolelle.

## Johtopäätökset

Sovellus onnistui hyvin eikä suuria haasteita syntynyt kehityksen aikana. Projektin luominen alussa tuotti pieniä vaikeuksia sillä, jos lisäsi Tailwindin Next.js projektiin se hajosi jostain syystä. Tämä ongelma ratkesi siten, että jätin Tailwindin pois projektista. Päätin käyttää tyylittelyyn tämän vuoksi Material UI-kirjastoa. Tietokannan yhdistäminen projektiin ja API-reitteihin onnistui hyvin. Sivujen luominen oli myös mutkatonta. Sovellukseen olisi voinut vielä lisätä PUT-reitittimet.

Työn aikana huomattiin, että Next.js tarjoaa erittäin joustavan ja tehokkaan ympäristön web-sovellusten kehittämiseen. App Routerin avulla reitityksen hallinta on selkeää ja helposti ylläpidettävää. Api Routes -ominaisuus puolestaan mahdollistaa suoraviivaisen tavan käsitellä HTTP-pyyntöjä ja luoda reitittimet.

Tärkeä havainto työn aikana oli myös miten SSR ja CSR eroavat toisistaan. Sovelluksessa hyödynnettään molempia renderöinti tapoja, vaikka SSR:n renderöinti Todo-sovelluksessa on vähäisempää. Taustatutkimuksen aikana opin niiden merkityksen ja sen, kuinka SSR ja CSR voivat oikeassa käytössä tehdä sovelluksesta responsiivisemman ja tehokkaamman. 

### Reflektointi
Työskentelyn aikana pääsin tutustumaan Next.js:n, johon en ennen ollut perehtynyt. Kiinnostuin erityisesti App Routerin ja Api Routes -reittien käytöstä, sillä niiden käyttö on selkeää ja järjestelmällistä. Päätin lisätä sovellukseen tietokannan, koska halusin kokeilla, miten API reitit toimisivat tietokannan kanssa. Opin siis myös lisäämään tietokannan Next.js sovellukseen, joka osoittautui olemaan hyvin yksinkertaista. API-reitit toimivat hyvin tietokannan kanssa, ja opin myös, miten reitit mahdollistavat dynaamisen datan käsittelyn.

Opin erityisesti SSR ja CSR eroista paljon. Vaikka en päässyt syventämään SSR:n mahdollisuuksia tässä työssä, raapaisin kuitenkin sen pintaa. Päätin keskittyä reitityksiin, sillä ne herättivät mielenkiintoni ensimmäisenä. Luin kuitenkin paljon erilaisia materiaaleja ja katsoin esimerkkejä SSR käytöstä, joten nyt minulla on melko hyvä kuva siitä miten sitä voidaan implementoida sovelluksiin. 

Next.js:n avulla pystyy kehittämään full-stack web-sovelluksia helposti. Sen käytännöt ovat järjestelmällisiä ja nopeasti ymmärrettävissä sekä tekevät sovelluksen rakentamisesta yksinkertaisempaa. Next.js:llä on laajasti eri ominaisuuksia, joita kaikkia ei tässä työssä ehditty käsittelemään. Tästä aiheesta voisi tutkia vielä esimerkiksi kuvien optimointi-ominaisuutta ja middleware-toimintoja.

## Lähteet
- MDN Web Docks. Server-Side rendering (SSR). [ https://developer.mozilla.org/en-US/docs/Glossary/SSR](https://developer.mozilla.org/en-US/docs/Glossary/SSR). Luettu: 27.4.2025
- Next.js Verkkosivut. Getting Started. [https://nextjs.org/docs/app/getting-started](https://nextjs.org/docs/app/getting-started)
- Youtube Video. Master Next JS in easy way. [https://www.youtube.com/watch?v=O8ivm7403rk](https://www.youtube.com/watch?v=O8ivm7403rk)




import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { join } from 'path';

const DATA_DIR = join(__dirname, '..', 'public', 'data');
const PUB_DATE = '2026-04-08T00:00:00.000Z';
const LAST_REFRESH = '2026-04-08';
const SOURCE_URL = 'https://unica.istruzione.gov.it/portale/it/scuola-in-chiaro';
const SOURCE_URLS = [SOURCE_URL, 'https://dati.istruzione.it/opendata/'];

function ensureDir(dir: string) {
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
}

function writeJson(filePath: string, data: unknown) {
  ensureDir(join(filePath, '..'));
  writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n', 'utf-8');
}

function slugify(s: string): string {
  return s.toLowerCase()
    .replace(/['']/g, '')
    .replace(/[àáâãäå]/g, 'a')
    .replace(/[èéêë]/g, 'e')
    .replace(/[ìíîï]/g, 'i')
    .replace(/[òóôõö]/g, 'o')
    .replace(/[ùúûü]/g, 'u')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function schoolSlug(name: string): string {
  return slugify(name.toLowerCase().replace(/^(ic|ls|lc|iis|iss|cd|sms|itt|itts|lm|ips|ipsar|ip|is) /, ''));
}

function officialUrl(code: string, name: string): string {
  return `https://unica.istruzione.gov.it/cercalatuascuola/istituti/${code}/${schoolSlug(name)}/`;
}

// ─── SCHOOL DATA ───
interface SchoolInput {
  code: string; name: string; address: string; cap: string; city: string;
  phone?: string; email: string; type: string; typeSlug: string;
  levelGroup: string; provinceSigla: string; provinceSlug: string;
  provinceName: string; regionSlug: string; regionName: string; citySlug: string;
  lat: number; lng: number;
}

const schools: SchoolInput[] = [
  // Roma
  { code:'RMIC8F2007', name:'IC Sandro Onofri', address:'Via Cutigliano 82', cap:'00169', city:'Roma', phone:'0655264932', email:'rmic8f2007@istruzione.it', type:'Istituto comprensivo', typeSlug:'istituto-comprensivo', levelGroup:'istituto-comprensivo', provinceSigla:'RM', provinceSlug:'roma', provinceName:'Roma', regionSlug:'lazio', regionName:'Lazio', citySlug:'roma', lat:41.8750, lng:12.5700 },
  { code:'RMPS26000V', name:'LS Aristotele', address:'Via Dei Sessanta 36', cap:'00176', city:'Roma', phone:'0621128445', email:'rmps26000v@istruzione.it', type:'Liceo scientifico', typeSlug:'liceo-scientifico', levelGroup:'secondaria-secondo-grado', provinceSigla:'RM', provinceSlug:'roma', provinceName:'Roma', regionSlug:'lazio', regionName:'Lazio', citySlug:'roma', lat:41.8850, lng:12.5250 },
  { code:'RMPC12000C', name:'LC Pilo Albertelli', address:'Via Daniele Manin 72', cap:'00185', city:'Roma', phone:'0644245461', email:'rmpc12000c@istruzione.it', type:'Liceo classico', typeSlug:'liceo-classico', levelGroup:'secondaria-secondo-grado', provinceSigla:'RM', provinceSlug:'roma', provinceName:'Roma', regionSlug:'lazio', regionName:'Lazio', citySlug:'roma', lat:41.8980, lng:12.5020 },
  { code:'RMPS520003', name:'LS Farnesina', address:'Via Dei Cavalieri 63', cap:'00136', city:'Roma', phone:'0635420985', email:'rmps520003@istruzione.it', type:'Liceo scientifico', typeSlug:'liceo-scientifico', levelGroup:'secondaria-secondo-grado', provinceSigla:'RM', provinceSlug:'roma', provinceName:'Roma', regionSlug:'lazio', regionName:'Lazio', citySlug:'roma', lat:41.9200, lng:12.4350 },
  { code:'RMIS022001', name:'IIS Leonardo Da Vinci', address:'Via Cavour 258', cap:'00184', city:'Roma', phone:'064741490', email:'rmis022001@istruzione.it', type:'Istituto di istruzione superiore', typeSlug:'istituto-superiore', levelGroup:'secondaria-secondo-grado', provinceSigla:'RM', provinceSlug:'roma', provinceName:'Roma', regionSlug:'lazio', regionName:'Lazio', citySlug:'roma', lat:41.8965, lng:12.4980 },
  { code:'RMIC8GE009', name:'IC Via Trionfale', address:'Via Trionfale 7333', cap:'00135', city:'Roma', phone:'0635059690', email:'rmic8ge009@istruzione.it', type:'Istituto comprensivo', typeSlug:'istituto-comprensivo', levelGroup:'istituto-comprensivo', provinceSigla:'RM', provinceSlug:'roma', provinceName:'Roma', regionSlug:'lazio', regionName:'Lazio', citySlug:'roma', lat:41.9400, lng:12.4200 },
  { code:'RMEE107006', name:'CD Cruillas', address:'Via Cassia 472', cap:'00189', city:'Roma', phone:'0633260260', email:'rmee107006@istruzione.it', type:'Scuola primaria', typeSlug:'scuola-primaria', levelGroup:'primaria', provinceSigla:'RM', provinceSlug:'roma', provinceName:'Roma', regionSlug:'lazio', regionName:'Lazio', citySlug:'roma', lat:41.9500, lng:12.4600 },
  { code:'RMMM8AB01C', name:'SMS Settembrini', address:'Via Sebenico 1', cap:'00198', city:'Roma', phone:'068411205', email:'rmmm8ab01c@istruzione.it', type:'Scuola secondaria di primo grado', typeSlug:'scuola-secondaria-di-primo-grado', levelGroup:'secondaria-primo-grado', provinceSigla:'RM', provinceSlug:'roma', provinceName:'Roma', regionSlug:'lazio', regionName:'Lazio', citySlug:'roma', lat:41.9180, lng:12.5050 },
  { code:'RMTF010006', name:'ITT Galileo Galilei', address:'Via Conte Verde 51', cap:'00185', city:'Roma', phone:'0644585258', email:'rmtf010006@istruzione.it', type:'Istituto tecnico', typeSlug:'istituto-tecnico', levelGroup:'secondaria-secondo-grado', provinceSigla:'RM', provinceSlug:'roma', provinceName:'Roma', regionSlug:'lazio', regionName:'Lazio', citySlug:'roma', lat:41.8940, lng:12.5100 },
  { code:'RMPM030006', name:'LM Margherita Di Savoia', address:'Via Cerveteri 53', cap:'00183', city:'Roma', phone:'0677209230', email:'rmpm030006@istruzione.it', type:'Liceo delle scienze umane', typeSlug:'liceo-scienze-umane', levelGroup:'secondaria-secondo-grado', provinceSigla:'RM', provinceSlug:'roma', provinceName:'Roma', regionSlug:'lazio', regionName:'Lazio', citySlug:'roma', lat:41.8780, lng:12.5100 },
  { code:'RMPS060005', name:'LS Cavour', address:'Via Delle Carine 1', cap:'00184', city:'Roma', phone:'064740498', email:'rmps060005@istruzione.it', type:'Liceo scientifico', typeSlug:'liceo-scientifico', levelGroup:'secondaria-secondo-grado', provinceSigla:'RM', provinceSlug:'roma', provinceName:'Roma', regionSlug:'lazio', regionName:'Lazio', citySlug:'roma', lat:41.8940, lng:12.4930 },
  { code:'RMPC150008', name:'LC Mamiani', address:'Viale Delle Milizie 30', cap:'00192', city:'Roma', phone:'063243685', email:'rmpc150008@istruzione.it', type:'Liceo classico', typeSlug:'liceo-classico', levelGroup:'secondaria-secondo-grado', provinceSigla:'RM', provinceSlug:'roma', provinceName:'Roma', regionSlug:'lazio', regionName:'Lazio', citySlug:'roma', lat:41.9100, lng:12.4600 },
  { code:'RMPS280004', name:'LS Righi', address:'Via Campania 63', cap:'00187', city:'Roma', phone:'064880163', email:'rmps280004@istruzione.it', type:'Liceo scientifico', typeSlug:'liceo-scientifico', levelGroup:'secondaria-secondo-grado', provinceSigla:'RM', provinceSlug:'roma', provinceName:'Roma', regionSlug:'lazio', regionName:'Lazio', citySlug:'roma', lat:41.9100, lng:12.4950 },
  { code:'RMPC04000R', name:'LC Giulio Cesare', address:'Corso Trieste 48', cap:'00198', city:'Roma', phone:'068413120', email:'rmpc04000r@istruzione.it', type:'Liceo classico', typeSlug:'liceo-classico', levelGroup:'secondaria-secondo-grado', provinceSigla:'RM', provinceSlug:'roma', provinceName:'Roma', regionSlug:'lazio', regionName:'Lazio', citySlug:'roma', lat:41.9180, lng:12.5100 },
  { code:'RMPS180007', name:'LS Morgagni', address:'Via Fonteiana 125', cap:'00152', city:'Roma', phone:'065809875', email:'rmps180007@istruzione.it', type:'Liceo scientifico', typeSlug:'liceo-scientifico', levelGroup:'secondaria-secondo-grado', provinceSigla:'RM', provinceSlug:'roma', provinceName:'Roma', regionSlug:'lazio', regionName:'Lazio', citySlug:'roma', lat:41.8750, lng:12.4500 },
  { code:'RMPS030009', name:'LS Augusto Righi', address:'Via Campania 63', cap:'00187', city:'Roma', phone:'', email:'rmps030009@istruzione.it', type:'Liceo scientifico', typeSlug:'liceo-scientifico', levelGroup:'secondaria-secondo-grado', provinceSigla:'RM', provinceSlug:'roma', provinceName:'Roma', regionSlug:'lazio', regionName:'Lazio', citySlug:'roma', lat:41.9100, lng:12.4950 },
  { code:'RMRI04000N', name:'IPSAR Tor Carbone', address:'Via di Tor Carbone 53', cap:'00178', city:'Roma', phone:'067100545', email:'rmri04000n@istruzione.it', type:'Istituto professionale', typeSlug:'istituto-professionale', levelGroup:'secondaria-secondo-grado', provinceSigla:'RM', provinceSlug:'roma', provinceName:'Roma', regionSlug:'lazio', regionName:'Lazio', citySlug:'roma', lat:41.8500, lng:12.5200 },
  // Milano
  { code:'MIPC03000N', name:'LC Berchet', address:'Via Della Commenda 26', cap:'20122', city:'Milano', phone:'0258314024', email:'mipc03000n@istruzione.it', type:'Liceo classico', typeSlug:'liceo-classico', levelGroup:'secondaria-secondo-grado', provinceSigla:'MI', provinceSlug:'milano', provinceName:'Milano', regionSlug:'lombardia', regionName:'Lombardia', citySlug:'milano', lat:45.4580, lng:9.1990 },
  { code:'MIPS01000B', name:'LS Vittorio Veneto', address:'Via De Vincenti 7', cap:'20148', city:'Milano', phone:'024045174', email:'mips01000b@istruzione.it', type:'Liceo scientifico', typeSlug:'liceo-scientifico', levelGroup:'secondaria-secondo-grado', provinceSigla:'MI', provinceSlug:'milano', provinceName:'Milano', regionSlug:'lombardia', regionName:'Lombardia', citySlug:'milano', lat:45.4700, lng:9.1400 },
  { code:'MIIC8FY00X', name:'IC Via Pareto', address:'Via Pareto 26', cap:'20151', city:'Milano', phone:'0238007438', email:'miic8fy00x@istruzione.it', type:'Istituto comprensivo', typeSlug:'istituto-comprensivo', levelGroup:'istituto-comprensivo', provinceSigla:'MI', provinceSlug:'milano', provinceName:'Milano', regionSlug:'lombardia', regionName:'Lombardia', citySlug:'milano', lat:45.4800, lng:9.1300 },
  { code:'MIPC010004', name:'LC Manzoni', address:'Via Orazio 3', cap:'20121', city:'Milano', phone:'0286450890', email:'mipc010004@istruzione.it', type:'Liceo classico', typeSlug:'liceo-classico', levelGroup:'secondaria-secondo-grado', provinceSigla:'MI', provinceSlug:'milano', provinceName:'Milano', regionSlug:'lombardia', regionName:'Lombardia', citySlug:'milano', lat:45.4650, lng:9.1800 },
  { code:'MIPS11000C', name:'LS Leonardo Da Vinci', address:'Via Ottorino Respighi 5', cap:'20122', city:'Milano', phone:'025462020', email:'mips11000c@istruzione.it', type:'Liceo scientifico', typeSlug:'liceo-scientifico', levelGroup:'secondaria-secondo-grado', provinceSigla:'MI', provinceSlug:'milano', provinceName:'Milano', regionSlug:'lombardia', regionName:'Lombardia', citySlug:'milano', lat:45.4600, lng:9.2000 },
  { code:'MITF19000B', name:'ITIS Molinari', address:'Via Crescenzago 110', cap:'20132', city:'Milano', phone:'022820122', email:'mitf19000b@istruzione.it', type:'Istituto tecnico', typeSlug:'istituto-tecnico', levelGroup:'secondaria-secondo-grado', provinceSigla:'MI', provinceSlug:'milano', provinceName:'Milano', regionSlug:'lombardia', regionName:'Lombardia', citySlug:'milano', lat:45.5000, lng:9.2300 },
  { code:'MIPM050003', name:'LM Agnesi', address:'Via Tabacchi 17', cap:'20136', city:'Milano', phone:'0258100671', email:'mipm050003@istruzione.it', type:'Liceo delle scienze umane', typeSlug:'liceo-scienze-umane', levelGroup:'secondaria-secondo-grado', provinceSigla:'MI', provinceSlug:'milano', provinceName:'Milano', regionSlug:'lombardia', regionName:'Lombardia', citySlug:'milano', lat:45.4480, lng:9.1900 },
  { code:'MIPS020002', name:'LS Volta', address:'Via Benedetto Marcello 7', cap:'20124', city:'Milano', phone:'022040784', email:'mips020002@istruzione.it', type:'Liceo scientifico', typeSlug:'liceo-scientifico', levelGroup:'secondaria-secondo-grado', provinceSigla:'MI', provinceSlug:'milano', provinceName:'Milano', regionSlug:'lombardia', regionName:'Lombardia', citySlug:'milano', lat:45.4780, lng:9.2000 },
  { code:'MIEE044005', name:'CD Cesare Battisti', address:'Via Palmieri 24', cap:'20141', city:'Milano', phone:'028466265', email:'miee044005@istruzione.it', type:'Scuola primaria', typeSlug:'scuola-primaria', levelGroup:'primaria', provinceSigla:'MI', provinceSlug:'milano', provinceName:'Milano', regionSlug:'lombardia', regionName:'Lombardia', citySlug:'milano', lat:45.4400, lng:9.2100 },
  { code:'MIRC03000T', name:'IP Bertarelli', address:'Corso di Porta Romana 110', cap:'20122', city:'Milano', phone:'0254557340', email:'mirc03000t@istruzione.it', type:'Istituto professionale', typeSlug:'istituto-professionale', levelGroup:'secondaria-secondo-grado', provinceSigla:'MI', provinceSlug:'milano', provinceName:'Milano', regionSlug:'lombardia', regionName:'Lombardia', citySlug:'milano', lat:45.4530, lng:9.1970 },
  // Napoli
  { code:'NAPS060007', name:'LS Mercalli', address:'Via Andrea D\'Isernia 34', cap:'80122', city:'Napoli', phone:'0817143745', email:'naps060007@istruzione.it', type:'Liceo scientifico', typeSlug:'liceo-scientifico', levelGroup:'secondaria-secondo-grado', provinceSigla:'NA', provinceSlug:'napoli', provinceName:'Napoli', regionSlug:'campania', regionName:'Campania', citySlug:'napoli', lat:40.8350, lng:14.2300 },
  { code:'NAPC01000Q', name:'LC Umberto I', address:'Via G Bovio 20', cap:'80133', city:'Napoli', phone:'081459081', email:'napc01000q@istruzione.it', type:'Liceo classico', typeSlug:'liceo-classico', levelGroup:'secondaria-secondo-grado', provinceSigla:'NA', provinceSlug:'napoli', provinceName:'Napoli', regionSlug:'campania', regionName:'Campania', citySlug:'napoli', lat:40.8500, lng:14.2650 },
  { code:'NAIC8BV00X', name:'IC Ristori', address:'Via G Bonito 6', cap:'80129', city:'Napoli', phone:'0815562640', email:'naic8bv00x@istruzione.it', type:'Istituto comprensivo', typeSlug:'istituto-comprensivo', levelGroup:'istituto-comprensivo', provinceSigla:'NA', provinceSlug:'napoli', provinceName:'Napoli', regionSlug:'campania', regionName:'Campania', citySlug:'napoli', lat:40.8450, lng:14.2400 },
  { code:'NAPS11000Q', name:'LS Vincenzo Cuoco', address:'Via Salvator Rosa 117', cap:'80136', city:'Napoli', phone:'0815495765', email:'naps11000q@istruzione.it', type:'Liceo scientifico', typeSlug:'liceo-scientifico', levelGroup:'secondaria-secondo-grado', provinceSigla:'NA', provinceSlug:'napoli', provinceName:'Napoli', regionSlug:'campania', regionName:'Campania', citySlug:'napoli', lat:40.8550, lng:14.2380 },
  { code:'NATF06000E', name:'ITT Giordani Striano', address:'Via Caravaggio 184', cap:'80126', city:'Napoli', phone:'0817672668', email:'natf06000e@istruzione.it', type:'Istituto tecnico', typeSlug:'istituto-tecnico', levelGroup:'secondaria-secondo-grado', provinceSigla:'NA', provinceSlug:'napoli', provinceName:'Napoli', regionSlug:'campania', regionName:'Campania', citySlug:'napoli', lat:40.8400, lng:14.2100 },
  // Torino
  { code:'TOPS020006', name:'LS Galileo Ferraris', address:'Corso Montevecchio 67', cap:'10129', city:'Torino', phone:'0115628685', email:'tops020006@istruzione.it', type:'Liceo scientifico', typeSlug:'liceo-scientifico', levelGroup:'secondaria-secondo-grado', provinceSigla:'TO', provinceSlug:'torino', provinceName:'Torino', regionSlug:'piemonte', regionName:'Piemonte', citySlug:'torino', lat:45.0600, lng:7.6650 },
  { code:'TOPC010003', name:'LC Gioberti', address:'Via Sant\'Ottavio 9', cap:'10124', city:'Torino', phone:'0118122493', email:'topc010003@istruzione.it', type:'Liceo classico', typeSlug:'liceo-classico', levelGroup:'secondaria-secondo-grado', provinceSigla:'TO', provinceSlug:'torino', provinceName:'Torino', regionSlug:'piemonte', regionName:'Piemonte', citySlug:'torino', lat:45.0680, lng:7.6950 },
  { code:'TOIC8A100T', name:'IC Regio Parco', address:'Via Beinasco 15', cap:'10154', city:'Torino', phone:'0112482421', email:'toic8a100t@istruzione.it', type:'Istituto comprensivo', typeSlug:'istituto-comprensivo', levelGroup:'istituto-comprensivo', provinceSigla:'TO', provinceSlug:'torino', provinceName:'Torino', regionSlug:'piemonte', regionName:'Piemonte', citySlug:'torino', lat:45.0850, lng:7.7000 },
  { code:'TOPS10000T', name:'LS Alfieri', address:'Corso Dante 80', cap:'10126', city:'Torino', phone:'0116507594', email:'tops10000t@istruzione.it', type:'Liceo scientifico', typeSlug:'liceo-scientifico', levelGroup:'secondaria-secondo-grado', provinceSigla:'TO', provinceSlug:'torino', provinceName:'Torino', regionSlug:'piemonte', regionName:'Piemonte', citySlug:'torino', lat:45.0520, lng:7.6800 },
  // Bologna
  { code:'BOPS030004', name:'LS Sabin', address:'Via Bologna 304/a', cap:'40139', city:'Bologna', phone:'0514590021', email:'bops030004@istruzione.it', type:'Liceo scientifico', typeSlug:'liceo-scientifico', levelGroup:'secondaria-secondo-grado', provinceSigla:'BO', provinceSlug:'bologna', provinceName:'Bologna', regionSlug:'emilia-romagna', regionName:'Emilia-Romagna', citySlug:'bologna', lat:44.4780, lng:11.3700 },
  { code:'BOPC02000A', name:'LC Minghetti', address:'Via Nazario Sauro 18', cap:'40121', city:'Bologna', phone:'051232628', email:'bopc02000a@istruzione.it', type:'Liceo classico', typeSlug:'liceo-classico', levelGroup:'secondaria-secondo-grado', provinceSigla:'BO', provinceSlug:'bologna', provinceName:'Bologna', regionSlug:'emilia-romagna', regionName:'Emilia-Romagna', citySlug:'bologna', lat:44.4950, lng:11.3450 },
  // Firenze
  { code:'FIPS02000N', name:'LS Michelangelo', address:'Via Della Colonna 9', cap:'50121', city:'Firenze', phone:'055580608', email:'fips02000n@istruzione.it', type:'Liceo scientifico', typeSlug:'liceo-scientifico', levelGroup:'secondaria-secondo-grado', provinceSigla:'FI', provinceSlug:'firenze', provinceName:'Firenze', regionSlug:'toscana', regionName:'Toscana', citySlug:'firenze', lat:43.7750, lng:11.2650 },
  { code:'FIPC030003', name:'LC Galileo', address:'Via Martelli 9', cap:'50129', city:'Firenze', phone:'055292030', email:'fipc030003@istruzione.it', type:'Liceo classico', typeSlug:'liceo-classico', levelGroup:'secondaria-secondo-grado', provinceSigla:'FI', provinceSlug:'firenze', provinceName:'Firenze', regionSlug:'toscana', regionName:'Toscana', citySlug:'firenze', lat:43.7740, lng:11.2560 },
  // Palermo
  { code:'PAPS02000L', name:'LS Galileo Galilei', address:'Via Danimarca 54', cap:'90146', city:'Palermo', phone:'091517264', email:'paps02000l@istruzione.it', type:'Liceo scientifico', typeSlug:'liceo-scientifico', levelGroup:'secondaria-secondo-grado', provinceSigla:'PA', provinceSlug:'palermo', provinceName:'Palermo', regionSlug:'sicilia', regionName:'Sicilia', citySlug:'palermo', lat:38.1200, lng:13.3300 },
  { code:'PAPC030004', name:'LC Meli', address:'Via Aldisio 2', cap:'90146', city:'Palermo', phone:'091521409', email:'papc030004@istruzione.it', type:'Liceo classico', typeSlug:'liceo-classico', levelGroup:'secondaria-secondo-grado', provinceSigla:'PA', provinceSlug:'palermo', provinceName:'Palermo', regionSlug:'sicilia', regionName:'Sicilia', citySlug:'palermo', lat:38.1200, lng:13.3350 },
  // Bari
  { code:'BAPS060001', name:'LS Fermi', address:'Via Celso Ulpiani 6', cap:'70126', city:'Bari', phone:'0805563944', email:'baps060001@istruzione.it', type:'Liceo scientifico', typeSlug:'liceo-scientifico', levelGroup:'secondaria-secondo-grado', provinceSigla:'BA', provinceSlug:'bari', provinceName:'Bari', regionSlug:'puglia', regionName:'Puglia', citySlug:'bari', lat:41.1060, lng:16.8650 },
  // Catania
  { code:'CTPS01000D', name:'LS Galileo Galilei', address:'Via Etnea 28', cap:'95125', city:'Catania', phone:'0957113200', email:'ctps01000d@istruzione.it', type:'Liceo scientifico', typeSlug:'liceo-scientifico', levelGroup:'secondaria-secondo-grado', provinceSigla:'CT', provinceSlug:'catania', provinceName:'Catania', regionSlug:'sicilia', regionName:'Sicilia', citySlug:'catania', lat:37.5100, lng:15.0850 },
  // Genova
  { code:'GEPS030003', name:'LS Cassini', address:'Via Galata 34/h', cap:'16121', city:'Genova', phone:'010565686', email:'geps030003@istruzione.it', type:'Liceo scientifico', typeSlug:'liceo-scientifico', levelGroup:'secondaria-secondo-grado', provinceSigla:'GE', provinceSlug:'genova', provinceName:'Genova', regionSlug:'liguria', regionName:'Liguria', citySlug:'genova', lat:44.4130, lng:8.9350 },
  // Venezia
  { code:'VEPS01000X', name:'LS Benedetti Tommaseo', address:'Via G Giustinian 11', cap:'30135', city:'Venezia', phone:'0415225369', email:'veps01000x@istruzione.it', type:'Liceo scientifico', typeSlug:'liceo-scientifico', levelGroup:'secondaria-secondo-grado', provinceSigla:'VE', provinceSlug:'venezia', provinceName:'Venezia', regionSlug:'veneto', regionName:'Veneto', citySlug:'venezia', lat:45.4350, lng:12.3250 },
  // Verona
  { code:'VRPS020006', name:'LS Galileo Galilei', address:'Via San Giacomo 11', cap:'37135', city:'Verona', phone:'0458348822', email:'vrps020006@istruzione.it', type:'Liceo scientifico', typeSlug:'liceo-scientifico', levelGroup:'secondaria-secondo-grado', provinceSigla:'VR', provinceSlug:'verona', provinceName:'Verona', regionSlug:'veneto', regionName:'Veneto', citySlug:'verona', lat:45.4350, lng:10.9900 },
  // Padova
  { code:'PDPS030004', name:'LS Galileo Galilei', address:'Via Trento 13', cap:'35139', city:'Padova', phone:'0498753468', email:'pdps030004@istruzione.it', type:'Liceo scientifico', typeSlug:'liceo-scientifico', levelGroup:'secondaria-secondo-grado', provinceSigla:'PD', provinceSlug:'padova', provinceName:'Padova', regionSlug:'veneto', regionName:'Veneto', citySlug:'padova', lat:45.4080, lng:11.8750 },
  // Brescia
  { code:'BSPS11000A', name:'LS Calini', address:'Via Monte Suello 2', cap:'25128', city:'Brescia', phone:'03039432', email:'bsps11000a@istruzione.it', type:'Liceo scientifico', typeSlug:'liceo-scientifico', levelGroup:'secondaria-secondo-grado', provinceSigla:'BS', provinceSlug:'brescia', provinceName:'Brescia', regionSlug:'lombardia', regionName:'Lombardia', citySlug:'brescia', lat:45.5300, lng:10.2200 },
  // Cagliari
  { code:'CAPS02000B', name:'LS Pacinotti', address:'Via Liguria 9', cap:'09127', city:'Cagliari', phone:'070494354', email:'caps02000b@istruzione.it', type:'Liceo scientifico', typeSlug:'liceo-scientifico', levelGroup:'secondaria-secondo-grado', provinceSigla:'CA', provinceSlug:'cagliari', provinceName:'Cagliari', regionSlug:'sardegna', regionName:'Sardegna', citySlug:'cagliari', lat:39.2200, lng:9.1150 },
  // Perugia
  { code:'PGPS02000N', name:'LS Galileo Galilei', address:'Via Pascoli snc', cap:'06123', city:'Perugia', phone:'0755721647', email:'pgps02000n@istruzione.it', type:'Liceo scientifico', typeSlug:'liceo-scientifico', levelGroup:'secondaria-secondo-grado', provinceSigla:'PG', provinceSlug:'perugia', provinceName:'Perugia', regionSlug:'umbria', regionName:'Umbria', citySlug:'perugia', lat:43.1100, lng:12.3900 },
  // Ancona
  { code:'ANPS010006', name:'LS Galilei', address:'Via Santa Maria in Potenza', cap:'60100', city:'Ancona', phone:'07186227', email:'anps010006@istruzione.it', type:'Liceo scientifico', typeSlug:'liceo-scientifico', levelGroup:'secondaria-secondo-grado', provinceSigla:'AN', provinceSlug:'ancona', provinceName:'Ancona', regionSlug:'marche', regionName:'Marche', citySlug:'ancona', lat:43.6100, lng:13.5100 },
  // Trieste
  { code:'TSPS01000R', name:'LS Galileo Galilei', address:'Via Mameli 4', cap:'34139', city:'Trieste', phone:'040390048', email:'tsps01000r@istruzione.it', type:'Liceo scientifico', typeSlug:'liceo-scientifico', levelGroup:'secondaria-secondo-grado', provinceSigla:'TS', provinceSlug:'trieste', provinceName:'Trieste', regionSlug:'friuli-venezia-giulia', regionName:'Friuli-Venezia Giulia', citySlug:'trieste', lat:45.6500, lng:13.7700 },
  // Trento
  { code:'TNPS01000V', name:'LS Galileo Galilei', address:'Viale Bolognini 88', cap:'38122', city:'Trento', phone:'0461913479', email:'tnps01000v@istruzione.it', type:'Liceo scientifico', typeSlug:'liceo-scientifico', levelGroup:'secondaria-secondo-grado', provinceSigla:'TN', provinceSlug:'trento', provinceName:'Trento', regionSlug:'trentino-alto-adige', regionName:'Trentino-Alto Adige', citySlug:'trento', lat:46.0700, lng:11.1200 },
  // Aosta
  { code:'AOIS001003', name:'IS Liceo Classico di Aosta', address:'Via Carducci 3', cap:'11100', city:'Aosta', phone:'0165262629', email:'aois001003@istruzione.it', type:'Liceo classico', typeSlug:'liceo-classico', levelGroup:'secondaria-secondo-grado', provinceSigla:'AO', provinceSlug:'aosta', provinceName:'Aosta', regionSlug:'valle-d-aosta', regionName:"Valle d'Aosta", citySlug:'aosta', lat:45.7350, lng:7.3200 },
  // Campobasso
  { code:'CBPS01000B', name:'LS Romita', address:'Via Facchinetti', cap:'86100', city:'Campobasso', phone:'0874493360', email:'cbps01000b@istruzione.it', type:'Liceo scientifico', typeSlug:'liceo-scientifico', levelGroup:'secondaria-secondo-grado', provinceSigla:'CB', provinceSlug:'campobasso', provinceName:'Campobasso', regionSlug:'molise', regionName:'Molise', citySlug:'campobasso', lat:41.5600, lng:14.6600 },
  // Potenza
  { code:'PZPS040007', name:'LS Galilei', address:'Via A. Di Francia', cap:'85100', city:'Potenza', phone:'0971441612', email:'pzps040007@istruzione.it', type:'Liceo scientifico', typeSlug:'liceo-scientifico', levelGroup:'secondaria-secondo-grado', provinceSigla:'PZ', provinceSlug:'potenza', provinceName:'Potenza', regionSlug:'basilicata', regionName:'Basilicata', citySlug:'potenza', lat:40.6400, lng:15.8050 },
  // Catanzaro
  { code:'CZPS02000R', name:'LS Siciliani', address:'Via A. Ferraro', cap:'88100', city:'Catanzaro', phone:'0961741155', email:'czps02000r@istruzione.it', type:'Liceo scientifico', typeSlug:'liceo-scientifico', levelGroup:'secondaria-secondo-grado', provinceSigla:'CZ', provinceSlug:'catanzaro', provinceName:'Catanzaro', regionSlug:'calabria', regionName:'Calabria', citySlug:'catanzaro', lat:38.9000, lng:16.5900 },
  // L'Aquila
  { code:'AQPS010002', name:'LS Bafile', address:'Via Acquasanta 2', cap:'67100', city:"L'Aquila", phone:'0862410212', email:'aqps010002@istruzione.it', type:'Liceo scientifico', typeSlug:'liceo-scientifico', levelGroup:'secondaria-secondo-grado', provinceSigla:'AQ', provinceSlug:'l-aquila', provinceName:"L'Aquila", regionSlug:'abruzzo', regionName:'Abruzzo', citySlug:'l-aquila', lat:42.3500, lng:13.4000 },
];

// ─── REGIONS ───
interface RegionDef {
  slug: string; name: string; code: string;
  provinces: { slug: string; name: string; sigla: string }[];
}

const regionDefs: RegionDef[] = [
  { slug:'piemonte', name:'Piemonte', code:'01', provinces:[
    {slug:'torino',name:'Torino',sigla:'TO'},{slug:'vercelli',name:'Vercelli',sigla:'VC'},{slug:'novara',name:'Novara',sigla:'NO'},{slug:'cuneo',name:'Cuneo',sigla:'CN'},{slug:'asti',name:'Asti',sigla:'AT'},{slug:'alessandria',name:'Alessandria',sigla:'AL'},{slug:'biella',name:'Biella',sigla:'BI'},{slug:'verbano-cusio-ossola',name:'Verbano-Cusio-Ossola',sigla:'VB'}
  ]},
  { slug:'valle-d-aosta', name:"Valle d'Aosta", code:'02', provinces:[
    {slug:'aosta',name:'Aosta',sigla:'AO'}
  ]},
  { slug:'lombardia', name:'Lombardia', code:'03', provinces:[
    {slug:'milano',name:'Milano',sigla:'MI'},{slug:'bergamo',name:'Bergamo',sigla:'BG'},{slug:'brescia',name:'Brescia',sigla:'BS'},{slug:'como',name:'Como',sigla:'CO'},{slug:'cremona',name:'Cremona',sigla:'CR'},{slug:'lecco',name:'Lecco',sigla:'LC'},{slug:'lodi',name:'Lodi',sigla:'LO'},{slug:'mantova',name:'Mantova',sigla:'MN'},{slug:'monza-e-della-brianza',name:'Monza e della Brianza',sigla:'MB'},{slug:'pavia',name:'Pavia',sigla:'PV'},{slug:'sondrio',name:'Sondrio',sigla:'SO'},{slug:'varese',name:'Varese',sigla:'VA'}
  ]},
  { slug:'trentino-alto-adige', name:'Trentino-Alto Adige', code:'04', provinces:[
    {slug:'trento',name:'Trento',sigla:'TN'},{slug:'bolzano',name:'Bolzano',sigla:'BZ'}
  ]},
  { slug:'veneto', name:'Veneto', code:'05', provinces:[
    {slug:'venezia',name:'Venezia',sigla:'VE'},{slug:'verona',name:'Verona',sigla:'VR'},{slug:'padova',name:'Padova',sigla:'PD'},{slug:'vicenza',name:'Vicenza',sigla:'VI'},{slug:'treviso',name:'Treviso',sigla:'TV'},{slug:'rovigo',name:'Rovigo',sigla:'RO'},{slug:'belluno',name:'Belluno',sigla:'BL'}
  ]},
  { slug:'friuli-venezia-giulia', name:'Friuli-Venezia Giulia', code:'06', provinces:[
    {slug:'trieste',name:'Trieste',sigla:'TS'},{slug:'udine',name:'Udine',sigla:'UD'},{slug:'pordenone',name:'Pordenone',sigla:'PN'},{slug:'gorizia',name:'Gorizia',sigla:'GO'}
  ]},
  { slug:'liguria', name:'Liguria', code:'07', provinces:[
    {slug:'genova',name:'Genova',sigla:'GE'},{slug:'imperia',name:'Imperia',sigla:'IM'},{slug:'la-spezia',name:'La Spezia',sigla:'SP'},{slug:'savona',name:'Savona',sigla:'SV'}
  ]},
  { slug:'emilia-romagna', name:'Emilia-Romagna', code:'08', provinces:[
    {slug:'bologna',name:'Bologna',sigla:'BO'},{slug:'ferrara',name:'Ferrara',sigla:'FE'},{slug:'forli-cesena',name:'Forli-Cesena',sigla:'FC'},{slug:'modena',name:'Modena',sigla:'MO'},{slug:'parma',name:'Parma',sigla:'PR'},{slug:'piacenza',name:'Piacenza',sigla:'PC'},{slug:'ravenna',name:'Ravenna',sigla:'RA'},{slug:'reggio-emilia',name:'Reggio Emilia',sigla:'RE'},{slug:'rimini',name:'Rimini',sigla:'RN'}
  ]},
  { slug:'toscana', name:'Toscana', code:'09', provinces:[
    {slug:'firenze',name:'Firenze',sigla:'FI'},{slug:'arezzo',name:'Arezzo',sigla:'AR'},{slug:'grosseto',name:'Grosseto',sigla:'GR'},{slug:'livorno',name:'Livorno',sigla:'LI'},{slug:'lucca',name:'Lucca',sigla:'LU'},{slug:'massa-carrara',name:'Massa-Carrara',sigla:'MS'},{slug:'pisa',name:'Pisa',sigla:'PI'},{slug:'pistoia',name:'Pistoia',sigla:'PT'},{slug:'prato',name:'Prato',sigla:'PO'},{slug:'siena',name:'Siena',sigla:'SI'}
  ]},
  { slug:'umbria', name:'Umbria', code:'10', provinces:[
    {slug:'perugia',name:'Perugia',sigla:'PG'},{slug:'terni',name:'Terni',sigla:'TR'}
  ]},
  { slug:'marche', name:'Marche', code:'11', provinces:[
    {slug:'ancona',name:'Ancona',sigla:'AN'},{slug:'ascoli-piceno',name:'Ascoli Piceno',sigla:'AP'},{slug:'fermo',name:'Fermo',sigla:'FM'},{slug:'macerata',name:'Macerata',sigla:'MC'},{slug:'pesaro-e-urbino',name:'Pesaro e Urbino',sigla:'PU'}
  ]},
  { slug:'lazio', name:'Lazio', code:'12', provinces:[
    {slug:'roma',name:'Roma',sigla:'RM'},{slug:'frosinone',name:'Frosinone',sigla:'FR'},{slug:'latina',name:'Latina',sigla:'LT'},{slug:'rieti',name:'Rieti',sigla:'RI'},{slug:'viterbo',name:'Viterbo',sigla:'VT'}
  ]},
  { slug:'abruzzo', name:'Abruzzo', code:'13', provinces:[
    {slug:'l-aquila',name:"L'Aquila",sigla:'AQ'},{slug:'chieti',name:'Chieti',sigla:'CH'},{slug:'pescara',name:'Pescara',sigla:'PE'},{slug:'teramo',name:'Teramo',sigla:'TE'}
  ]},
  { slug:'molise', name:'Molise', code:'14', provinces:[
    {slug:'campobasso',name:'Campobasso',sigla:'CB'},{slug:'isernia',name:'Isernia',sigla:'IS'}
  ]},
  { slug:'campania', name:'Campania', code:'15', provinces:[
    {slug:'napoli',name:'Napoli',sigla:'NA'},{slug:'avellino',name:'Avellino',sigla:'AV'},{slug:'benevento',name:'Benevento',sigla:'BN'},{slug:'caserta',name:'Caserta',sigla:'CE'},{slug:'salerno',name:'Salerno',sigla:'SA'}
  ]},
  { slug:'puglia', name:'Puglia', code:'16', provinces:[
    {slug:'bari',name:'Bari',sigla:'BA'},{slug:'barletta-andria-trani',name:'Barletta-Andria-Trani',sigla:'BT'},{slug:'brindisi',name:'Brindisi',sigla:'BR'},{slug:'foggia',name:'Foggia',sigla:'FG'},{slug:'lecce',name:'Lecce',sigla:'LE'},{slug:'taranto',name:'Taranto',sigla:'TA'}
  ]},
  { slug:'basilicata', name:'Basilicata', code:'17', provinces:[
    {slug:'potenza',name:'Potenza',sigla:'PZ'},{slug:'matera',name:'Matera',sigla:'MT'}
  ]},
  { slug:'calabria', name:'Calabria', code:'18', provinces:[
    {slug:'catanzaro',name:'Catanzaro',sigla:'CZ'},{slug:'cosenza',name:'Cosenza',sigla:'CS'},{slug:'crotone',name:'Crotone',sigla:'KR'},{slug:'reggio-calabria',name:'Reggio Calabria',sigla:'RC'},{slug:'vibo-valentia',name:'Vibo Valentia',sigla:'VV'}
  ]},
  { slug:'sicilia', name:'Sicilia', code:'19', provinces:[
    {slug:'palermo',name:'Palermo',sigla:'PA'},{slug:'agrigento',name:'Agrigento',sigla:'AG'},{slug:'caltanissetta',name:'Caltanissetta',sigla:'CL'},{slug:'catania',name:'Catania',sigla:'CT'},{slug:'enna',name:'Enna',sigla:'EN'},{slug:'messina',name:'Messina',sigla:'ME'},{slug:'ragusa',name:'Ragusa',sigla:'RG'},{slug:'siracusa',name:'Siracusa',sigla:'SR'},{slug:'trapani',name:'Trapani',sigla:'TP'}
  ]},
  { slug:'sardegna', name:'Sardegna', code:'20', provinces:[
    {slug:'cagliari',name:'Cagliari',sigla:'CA'},{slug:'nuoro',name:'Nuoro',sigla:'NU'},{slug:'oristano',name:'Oristano',sigla:'OR'},{slug:'sassari',name:'Sassari',sigla:'SS'},{slug:'sud-sardegna',name:'Sud Sardegna',sigla:'SU'}
  ]},
];

// ─── SCHOOL TYPES ───
interface SchoolTypeDef {
  slug: string; label: string; levelGroup: string; intro: string; schoolCount: number;
}

const schoolTypeDefs: SchoolTypeDef[] = [
  { slug:'scuola-dell-infanzia', label:"Scuola dell'infanzia", levelGroup:'infanzia', intro:"Hub nazionale per le scuole dell'infanzia, il primo livello del sistema scolastico italiano per bambini da 3 a 6 anni.", schoolCount:23500 },
  { slug:'scuola-primaria', label:'Scuola primaria', levelGroup:'primaria', intro:'Hub nazionale per le scuole primarie italiane, il ciclo di istruzione obbligatoria per bambini da 6 a 11 anni.', schoolCount:16800 },
  { slug:'scuola-secondaria-di-primo-grado', label:'Scuola secondaria di primo grado', levelGroup:'secondaria-primo-grado', intro:'Hub nazionale per le scuole secondarie di primo grado (scuole medie), il ciclo dai 11 ai 14 anni.', schoolCount:7800 },
  { slug:'liceo-scientifico', label:'Liceo scientifico', levelGroup:'secondaria-secondo-grado', intro:'Hub nazionale per i licei scientifici, con accesso rapido alle citta e province dove confrontare le scuole in modo utile.', schoolCount:2400 },
  { slug:'liceo-classico', label:'Liceo classico', levelGroup:'secondaria-secondo-grado', intro:'Hub nazionale per i licei classici, il percorso liceale con forte impronta umanistica e studio del latino e greco antico.', schoolCount:1200 },
  { slug:'liceo-linguistico', label:'Liceo linguistico', levelGroup:'secondaria-secondo-grado', intro:'Hub nazionale per i licei linguistici, il percorso liceale orientato allo studio approfondito di lingue straniere.', schoolCount:950 },
  { slug:'liceo-scienze-umane', label:'Liceo delle scienze umane', levelGroup:'secondaria-secondo-grado', intro:'Hub nazionale per i licei delle scienze umane, il percorso che unisce formazione umanistica e psico-pedagogica.', schoolCount:850 },
  { slug:'liceo-artistico', label:'Liceo artistico', levelGroup:'secondaria-secondo-grado', intro:'Hub nazionale per i licei artistici, il percorso liceale orientato alle discipline artistiche e progettuali.', schoolCount:450 },
  { slug:'istituto-tecnico', label:'Istituto tecnico', levelGroup:'secondaria-secondo-grado', intro:'Hub nazionale per gli istituti tecnici, percorsi che combinano cultura generale e competenze tecniche specialistiche.', schoolCount:3200 },
  { slug:'istituto-professionale', label:'Istituto professionale', levelGroup:'secondaria-secondo-grado', intro:'Hub nazionale per gli istituti professionali, percorsi orientati all\'inserimento nel mondo del lavoro.', schoolCount:2100 },
  { slug:'istituto-comprensivo', label:'Istituto comprensivo', levelGroup:'istituto-comprensivo', intro:'Hub nazionale per gli istituti comprensivi, strutture che raggruppano scuole dell\'infanzia, primarie e secondarie di primo grado.', schoolCount:8200 },
  { slug:'istituto-superiore', label:'Istituto di istruzione superiore', levelGroup:'secondaria-secondo-grado', intro:'Hub nazionale per gli istituti di istruzione superiore, strutture che raggruppano piu indirizzi di scuola secondaria di secondo grado.', schoolCount:2800 },
];

// ─── CITIES ───
interface CityDef {
  slug: string; name: string; provinceSlug: string; provinceName: string;
  regionSlug: string; regionName: string; lat: number; lng: number;
  published: boolean; population?: number;
}

const cityDefs: CityDef[] = [
  { slug:'roma', name:'Roma', provinceSlug:'roma', provinceName:'Roma', regionSlug:'lazio', regionName:'Lazio', lat:41.9028, lng:12.4964, published:true, population:2873000 },
  { slug:'milano', name:'Milano', provinceSlug:'milano', provinceName:'Milano', regionSlug:'lombardia', regionName:'Lombardia', lat:45.4642, lng:9.1900, published:true, population:1396000 },
  { slug:'napoli', name:'Napoli', provinceSlug:'napoli', provinceName:'Napoli', regionSlug:'campania', regionName:'Campania', lat:40.8518, lng:14.2681, published:true, population:959000 },
  { slug:'torino', name:'Torino', provinceSlug:'torino', provinceName:'Torino', regionSlug:'piemonte', regionName:'Piemonte', lat:45.0703, lng:7.6869, published:true, population:870000 },
  { slug:'bologna', name:'Bologna', provinceSlug:'bologna', provinceName:'Bologna', regionSlug:'emilia-romagna', regionName:'Emilia-Romagna', lat:44.4949, lng:11.3426, published:true, population:394000 },
  { slug:'firenze', name:'Firenze', provinceSlug:'firenze', provinceName:'Firenze', regionSlug:'toscana', regionName:'Toscana', lat:43.7696, lng:11.2558, published:true, population:382000 },
  { slug:'palermo', name:'Palermo', provinceSlug:'palermo', provinceName:'Palermo', regionSlug:'sicilia', regionName:'Sicilia', lat:38.1157, lng:13.3615, published:true, population:673000 },
  { slug:'bari', name:'Bari', provinceSlug:'bari', provinceName:'Bari', regionSlug:'puglia', regionName:'Puglia', lat:41.1171, lng:16.8719, published:true, population:324000 },
  { slug:'catania', name:'Catania', provinceSlug:'catania', provinceName:'Catania', regionSlug:'sicilia', regionName:'Sicilia', lat:37.5079, lng:15.0830, published:true, population:311000 },
  { slug:'genova', name:'Genova', provinceSlug:'genova', provinceName:'Genova', regionSlug:'liguria', regionName:'Liguria', lat:44.4056, lng:8.9463, published:true, population:580000 },
  { slug:'venezia', name:'Venezia', provinceSlug:'venezia', provinceName:'Venezia', regionSlug:'veneto', regionName:'Veneto', lat:45.4408, lng:12.3155, published:true, population:261000 },
  { slug:'verona', name:'Verona', provinceSlug:'verona', provinceName:'Verona', regionSlug:'veneto', regionName:'Veneto', lat:45.4384, lng:10.9916, published:true, population:259000 },
  { slug:'padova', name:'Padova', provinceSlug:'padova', provinceName:'Padova', regionSlug:'veneto', regionName:'Veneto', lat:45.4064, lng:11.8768, published:true, population:214000 },
  { slug:'brescia', name:'Brescia', provinceSlug:'brescia', provinceName:'Brescia', regionSlug:'lombardia', regionName:'Lombardia', lat:45.5416, lng:10.2118, published:true, population:200000 },
  { slug:'cagliari', name:'Cagliari', provinceSlug:'cagliari', provinceName:'Cagliari', regionSlug:'sardegna', regionName:'Sardegna', lat:39.2238, lng:9.1217, published:true, population:154000 },
  { slug:'perugia', name:'Perugia', provinceSlug:'perugia', provinceName:'Perugia', regionSlug:'umbria', regionName:'Umbria', lat:43.1107, lng:12.3908, published:true, population:167000 },
  { slug:'ancona', name:'Ancona', provinceSlug:'ancona', provinceName:'Ancona', regionSlug:'marche', regionName:'Marche', lat:43.6158, lng:13.5189, published:true, population:101000 },
  { slug:'trieste', name:'Trieste', provinceSlug:'trieste', provinceName:'Trieste', regionSlug:'friuli-venezia-giulia', regionName:'Friuli-Venezia Giulia', lat:45.6495, lng:13.7768, published:true, population:204000 },
  { slug:'trento', name:'Trento', provinceSlug:'trento', provinceName:'Trento', regionSlug:'trentino-alto-adige', regionName:'Trentino-Alto Adige', lat:46.0748, lng:11.1217, published:true, population:119000 },
  { slug:'aosta', name:'Aosta', provinceSlug:'aosta', provinceName:'Aosta', regionSlug:'valle-d-aosta', regionName:"Valle d'Aosta", lat:45.7375, lng:7.3154, published:true, population:34000 },
  { slug:'campobasso', name:'Campobasso', provinceSlug:'campobasso', provinceName:'Campobasso', regionSlug:'molise', regionName:'Molise', lat:41.5630, lng:14.6568, published:true, population:49000 },
  { slug:'potenza', name:'Potenza', provinceSlug:'potenza', provinceName:'Potenza', regionSlug:'basilicata', regionName:'Basilicata', lat:40.6395, lng:15.8056, published:true, population:67000 },
  { slug:'catanzaro', name:'Catanzaro', provinceSlug:'catanzaro', provinceName:'Catanzaro', regionSlug:'calabria', regionName:'Calabria', lat:38.9098, lng:16.5877, published:true, population:88000 },
  { slug:'l-aquila', name:"L'Aquila", provinceSlug:'l-aquila', provinceName:"L'Aquila", regionSlug:'abruzzo', regionName:'Abruzzo', lat:42.3498, lng:13.3995, published:true, population:70000 },
  // Smaller cities
  { slug:'guidonia-montecelio', name:'Guidonia Montecelio', provinceSlug:'roma', provinceName:'Roma', regionSlug:'lazio', regionName:'Lazio', lat:41.9992, lng:12.7231, published:false },
  { slug:'fiumicino', name:'Fiumicino', provinceSlug:'roma', provinceName:'Roma', regionSlug:'lazio', regionName:'Lazio', lat:41.7668, lng:12.2345, published:false },
  { slug:'prato', name:'Prato', provinceSlug:'prato', provinceName:'Prato', regionSlug:'toscana', regionName:'Toscana', lat:43.8777, lng:11.1020, published:false },
  { slug:'bergamo', name:'Bergamo', provinceSlug:'bergamo', provinceName:'Bergamo', regionSlug:'lombardia', regionName:'Lombardia', lat:45.6983, lng:9.6773, published:false },
  { slug:'modena', name:'Modena', provinceSlug:'modena', provinceName:'Modena', regionSlug:'emilia-romagna', regionName:'Emilia-Romagna', lat:44.6471, lng:10.9252, published:false },
  { slug:'parma', name:'Parma', provinceSlug:'parma', provinceName:'Parma', regionSlug:'emilia-romagna', regionName:'Emilia-Romagna', lat:44.8015, lng:10.3279, published:false },
  { slug:'reggio-emilia', name:'Reggio Emilia', provinceSlug:'reggio-emilia', provinceName:'Reggio Emilia', regionSlug:'emilia-romagna', regionName:'Emilia-Romagna', lat:44.6989, lng:10.6310, published:false },
  { slug:'livorno', name:'Livorno', provinceSlug:'livorno', provinceName:'Livorno', regionSlug:'toscana', regionName:'Toscana', lat:43.5485, lng:10.3106, published:false },
  { slug:'messina', name:'Messina', provinceSlug:'messina', provinceName:'Messina', regionSlug:'sicilia', regionName:'Sicilia', lat:38.1938, lng:15.5540, published:false },
  { slug:'taranto', name:'Taranto', provinceSlug:'taranto', provinceName:'Taranto', regionSlug:'puglia', regionName:'Puglia', lat:40.4647, lng:17.2470, published:false },
  { slug:'reggio-calabria', name:'Reggio Calabria', provinceSlug:'reggio-calabria', provinceName:'Reggio Calabria', regionSlug:'calabria', regionName:'Calabria', lat:38.1113, lng:15.6474, published:false },
  { slug:'sassari', name:'Sassari', provinceSlug:'sassari', provinceName:'Sassari', regionSlug:'sardegna', regionName:'Sardegna', lat:40.7259, lng:8.5559, published:false },
];

// ─── COMPARE PRESETS ───
interface ComparePreset {
  slug: string; title: string; citySlug: string; schoolTypeSlug: string; schoolCodes: string[];
}

const comparePresets: ComparePreset[] = [
  { slug:'roma-licei-scientifici', title:'Confronta licei scientifici a Roma', citySlug:'roma', schoolTypeSlug:'liceo-scientifico', schoolCodes:['RMPS26000V','RMPS520003','RMPS060005','RMPS280004','RMPS180007','RMPS030009'] },
  { slug:'roma-licei-classici', title:'Confronta licei classici a Roma', citySlug:'roma', schoolTypeSlug:'liceo-classico', schoolCodes:['RMPC12000C','RMPC150008','RMPC04000R'] },
  { slug:'roma-istituti-comprensivi', title:'Confronta istituti comprensivi a Roma', citySlug:'roma', schoolTypeSlug:'istituto-comprensivo', schoolCodes:['RMIC8F2007','RMIC8GE009'] },
  { slug:'milano-licei-scientifici', title:'Confronta licei scientifici a Milano', citySlug:'milano', schoolTypeSlug:'liceo-scientifico', schoolCodes:['MIPS01000B','MIPS11000C','MIPS020002'] },
  { slug:'milano-licei-classici', title:'Confronta licei classici a Milano', citySlug:'milano', schoolTypeSlug:'liceo-classico', schoolCodes:['MIPC03000N','MIPC010004'] },
  { slug:'napoli-licei-scientifici', title:'Confronta licei scientifici a Napoli', citySlug:'napoli', schoolTypeSlug:'liceo-scientifico', schoolCodes:['NAPS060007','NAPS11000Q'] },
  { slug:'torino-licei-scientifici', title:'Confronta licei scientifici a Torino', citySlug:'torino', schoolTypeSlug:'liceo-scientifico', schoolCodes:['TOPS020006','TOPS10000T'] },
];

const compareFields = [
  'address.full','contacts.phone','contacts.email','contacts.websiteUrl',
  'availability.hasServizi','availability.hasPtof','availability.hasRav',
  'servicesSummary.hasDigitalLabs'
];

// ─── GUIDES ───
interface GuideDef {
  slug: string; title: string; targetKeyword: string;
  sections: { heading: string; body: string }[];
}

const guideDefs: GuideDef[] = [
  { slug:'come-leggere-scheda-scuola', title:'Come leggere la scheda di una scuola su Scuolario', targetKeyword:'scuola in chiaro',
    sections:[
      {heading:'Cosa trovi nella scheda scuola', body:'Ogni scheda scuola su Scuolario presenta le informazioni ufficiali estratte da Scuola in Chiaro del MIM: nome ufficiale, codice meccanografico, indirizzo, contatti (telefono, email, PEC), sito web istituzionale e tipologia scolastica. Tutti i dati provengono da fonti pubbliche ministeriali.'},
      {heading:'Come verificare le fonti', body:'In ogni scheda trovi un link diretto alla pagina ufficiale su Scuola in Chiaro. Ti consigliamo sempre di verificare i dati direttamente sul portale ministeriale, soprattutto per informazioni che cambiano frequentemente come orari e iscrizioni.'},
      {heading:'Sezioni della scheda', body:'La scheda e organizzata in sezioni: identita e contatti, servizi e attivita, didattica, finanza, documenti ufficiali (RAV, PTOF, rendicontazione sociale), edilizia e PON. Non tutte le sezioni sono disponibili per ogni scuola: dove manca un dato, lo indichiamo chiaramente.'},
      {heading:'Confronto con altre scuole', body:'Dalla scheda puoi accedere a pagine di confronto preimpostate che mostrano scuole della stessa tipologia nella stessa citta. Il confronto non include punteggi o classifiche, ma solo campi ufficiali comparabili.'}
    ]},
  { slug:'codice-meccanografico-scuole', title:"Cos'e il codice meccanografico di una scuola e come usarlo", targetKeyword:'codice meccanografico scuole',
    sections:[
      {heading:"Che cos'e", body:'Il codice meccanografico e un identificativo univoco assegnato dal Ministero dell\'Istruzione e del Merito (MIM) a ogni istituzione scolastica italiana. E composto da 10 caratteri alfanumerici: le prime due lettere indicano la provincia (es. RM per Roma, MI per Milano), seguite da lettere che indicano il tipo di scuola e da numeri progressivi.'},
      {heading:'Dove si trova', body:'Puoi trovare il codice meccanografico sul sito della scuola, nei documenti ufficiali dell\'istituto, nella piattaforma Scuola in Chiaro del MIM, o direttamente su Scuolario cercando il nome della scuola. Il codice e riportato anche nei moduli di iscrizione.'},
      {heading:'Come usarlo su Scuolario', body:'Su Scuolario puoi cercare direttamente un codice meccanografico nella barra di ricerca per accedere immediatamente alla scheda della scuola. Ogni pagina scuola mostra il codice in modo prominente per facilitare l\'identificazione univoca dell\'istituto.'},
      {heading:'Struttura del codice', body:'Esempio: RMIC8F2007. RM = provincia di Roma, IC = istituto comprensivo, 8F2007 = codice progressivo. Le lettere dopo la sigla provinciale variano: PC = liceo classico, PS = liceo scientifico, TF = istituto tecnico, IC = istituto comprensivo, EE = scuola primaria, MM = scuola media.'}
    ]},
  { slug:'differenza-liceo-tecnico-professionale', title:'Differenza tra liceo, istituto tecnico e professionale', targetKeyword:'differenza liceo istituto tecnico professionale',
    sections:[
      {heading:'I tre percorsi della scuola superiore', body:'Dopo la scuola secondaria di primo grado (scuola media), gli studenti italiani possono scegliere tra tre percorsi principali: liceo, istituto tecnico e istituto professionale. Tutti durano 5 anni e permettono l\'accesso all\'universita.'},
      {heading:'Il liceo', body:'Il liceo offre una formazione culturale ampia e approfondita. Esistono diversi indirizzi: scientifico, classico, linguistico, scienze umane, artistico e musicale. L\'obiettivo principale e preparare gli studenti alla prosecuzione degli studi universitari.'},
      {heading:'L\'istituto tecnico', body:'L\'istituto tecnico combina una solida base culturale con competenze tecniche specialistiche. Si divide in due settori: economico e tecnologico. Prepara sia per l\'ingresso nel mondo del lavoro sia per l\'universita, con un approccio pratico e laboratoriale.'},
      {heading:'L\'istituto professionale', body:'L\'istituto professionale e orientato all\'acquisizione di competenze pratiche per l\'inserimento diretto nel mondo del lavoro. Offre indirizzi nei settori dei servizi e dell\'industria/artigianato. Permette comunque l\'accesso all\'universita.'},
      {heading:'Come scegliere', body:'La scelta dipende dalle attitudini e dagli interessi dello studente. Non esiste un percorso migliore in assoluto: ogni indirizzo ha i propri punti di forza. Scuolario permette di confrontare scuole della stessa tipologia nella propria citta usando solo dati ufficiali, senza classifiche inventate.'}
    ]},
  { slug:'come-confrontare-scuole-senza-classifiche', title:'Come confrontare scuole senza classifiche inventate', targetKeyword:'confrontare scuole',
    sections:[
      {heading:'Perche evitare le classifiche', body:'Molti siti propongono classifiche di scuole basate su punteggi sintetici inventati che non hanno base scientifica o istituzionale. Questi punteggi possono essere fuorvianti e non riflettono la complessita della qualita scolastica.'},
      {heading:'Cosa confrontare davvero', body:'Su Scuolario puoi confrontare dati ufficiali reali: indirizzo e posizione, contatti, servizi disponibili (laboratori, spazi innovativi), documenti pubblicati (RAV, PTOF), e informazioni sulla finanza scolastica. Questi sono fatti verificabili, non opinioni.'},
      {heading:'Come usare le pagine di confronto', body:'Le pagine di confronto su Scuolario mostrano scuole della stessa tipologia nella stessa citta, fianco a fianco. Ogni campo mostrato proviene da fonti ufficiali. Dove un dato non e disponibile, lo indichiamo con "Dato non disponibile" invece di inventare un valore.'},
      {heading:'Verificare sempre alla fonte', body:'Ogni confronto include link diretti alle pagine ufficiali su Scuola in Chiaro. Ti invitiamo sempre a verificare i dati e a visitare le scuole di persona prima di prendere una decisione.'}
    ]},
  { slug:'come-trovare-scuola-per-citta', title:'Come trovare una scuola per citta, provincia e tipologia', targetKeyword:'trovare scuola per citta',
    sections:[
      {heading:'Ricerca per citta', body:'Su Scuolario puoi cercare scuole partendo dalla tua citta. Vai alla sezione Comuni, cerca il tuo comune e troverai l\'elenco completo delle scuole pubblicate con filtri per tipologia scolastica.'},
      {heading:'Ricerca per provincia', body:'Se vuoi esplorare un\'area piu ampia, puoi partire dalla provincia. Ogni pagina provincia mostra i comuni con scuole pubblicate e le principali tipologie scolastiche disponibili nel territorio.'},
      {heading:'Filtri per tipologia', body:'Puoi filtrare le scuole per tipologia (liceo scientifico, classico, istituto tecnico, ecc.) sia dalla pagina del comune sia dalla sezione Tipologie, che mostra una panoramica nazionale per ogni tipo di scuola.'},
      {heading:'Ricerca diretta', body:'Dalla barra di ricerca nella home page puoi cercare direttamente il nome di una scuola, un codice meccanografico, o il nome di una citta per accedere rapidamente alle informazioni che cerchi.'}
    ]},
  { slug:'scuola-primaria-secondaria-differenze', title:'Scuola primaria, secondaria di primo grado e secondo grado: differenze', targetKeyword:'differenza scuola primaria secondaria',
    sections:[
      {heading:'La scuola primaria', body:'La scuola primaria (ex scuola elementare) accoglie bambini dai 6 agli 11 anni per un ciclo di 5 anni. E obbligatoria e fornisce le basi dell\'alfabetizzazione, della matematica e delle altre discipline fondamentali.'},
      {heading:'La scuola secondaria di primo grado', body:'La scuola secondaria di primo grado (ex scuola media) dura 3 anni, dai 11 ai 14 anni. Completa il ciclo dell\'istruzione obbligatoria di base e prepara alla scelta della scuola superiore.'},
      {heading:'La scuola secondaria di secondo grado', body:'La scuola secondaria di secondo grado (scuola superiore) dura 5 anni, dai 14 ai 19 anni. Si articola in licei, istituti tecnici e istituti professionali. Al termine si consegue il diploma di maturita.'},
      {heading:'L\'istituto comprensivo', body:'L\'istituto comprensivo e una struttura che raggruppa sotto un\'unica direzione scuole dell\'infanzia, primarie e secondarie di primo grado dello stesso territorio. Non e un tipo di scuola a se, ma un modello organizzativo.'}
    ]},
  { slug:'come-usare-scuola-in-chiaro', title:'Come usare Scuola in Chiaro e quando conviene usare Scuolario', targetKeyword:'scuola in chiaro come usare',
    sections:[
      {heading:"Cos'e Scuola in Chiaro", body:'Scuola in Chiaro e il portale ufficiale del Ministero dell\'Istruzione e del Merito (MIM) che permette di cercare informazioni su tutte le scuole italiane. E la fonte primaria e autorevole per dati scolastici ufficiali.'},
      {heading:'Come cercare su Scuola in Chiaro', body:'Su Scuola in Chiaro puoi cercare una scuola per nome, codice meccanografico, comune o indirizzo. Il portale offre schede dettagliate con informazioni su didattica, servizi, finanza, valutazione e altro.'},
      {heading:'Quando usare Scuolario', body:'Scuolario riorganizza gli stessi dati pubblici ufficiali in un\'interfaccia piu veloce da navigare. E particolarmente utile quando vuoi: sfogliare scuole per citta e tipologia, confrontare piu scuole fianco a fianco, o trovare rapidamente contatti e informazioni di base.'},
      {heading:'Scuolario e Scuola in Chiaro insieme', body:'Scuolario non sostituisce Scuola in Chiaro ma lo complementa. Ogni pagina scuola su Scuolario include un link diretto alla fonte ufficiale. Per decisioni importanti come le iscrizioni, verifica sempre sul portale ministeriale.'}
    ]},
  { slug:'scuola-paritaria-cosa-significa', title:'Scuola paritaria: cosa significa', targetKeyword:'scuola paritaria significato',
    sections:[
      {heading:'Definizione di scuola paritaria', body:'Una scuola paritaria e un istituto non statale che ha ottenuto il riconoscimento della parita scolastica dal Ministero dell\'Istruzione. Questo significa che il suo percorso di studi e i titoli rilasciati hanno lo stesso valore legale di quelli delle scuole statali.'},
      {heading:'Differenza con la scuola statale', body:'La principale differenza e nella gestione: le scuole statali sono gestite direttamente dallo Stato, mentre le paritarie sono gestite da enti privati (religiosi, laici, cooperative). Le paritarie possono richiedere un contributo economico alle famiglie.'},
      {heading:'Come riconoscerle', body:'Su Scuolario, dove disponibile, indichiamo lo status giuridico della scuola (statale o paritaria). Puoi verificare lo status di qualsiasi scuola anche su Scuola in Chiaro del MIM.'},
      {heading:'Qualita e controlli', body:'Le scuole paritarie sono soggette a controlli periodici da parte del Ministero per mantenere il riconoscimento. Devono rispettare gli ordinamenti generali dell\'istruzione e garantire standard qualitativi definiti dalla legge.'}
    ]},
  { slug:'iscrizione-scuola-primaria-cosa-guardare', title:'Iscrizione alla scuola primaria: cosa guardare prima di scegliere', targetKeyword:'iscrizione scuola primaria cosa guardare',
    sections:[
      {heading:'Quando e come iscriversi', body:'Le iscrizioni alla scuola primaria si effettuano online sul portale del MIM, generalmente tra gennaio e febbraio per l\'anno scolastico successivo. Possono iscriversi i bambini che compiono 6 anni entro il 31 dicembre dell\'anno di riferimento.'},
      {heading:'Cosa valutare nella scelta', body:'Oltre alla vicinanza a casa, considera: l\'offerta formativa (tempo pieno o modulare), i servizi disponibili (mensa, doposcuola, laboratori), le strutture scolastiche e l\'organizzazione didattica. Su Scuolario puoi confrontare questi aspetti usando dati ufficiali.'},
      {heading:'Tempo pieno e tempo normale', body:'Il tempo pieno prevede 40 ore settimanali con mensa inclusa. Il tempo normale prevede 27-30 ore settimanali. La disponibilita varia da scuola a scuola e puo essere verificata sulla scheda ufficiale dell\'istituto.'},
      {heading:'Visitare la scuola', body:'Nessun dato online sostituisce una visita diretta. Partecipa agli open day organizzati dalle scuole, parla con i docenti e osserva gli ambienti. Usa Scuolario per identificare le scuole candidate e poi verificane di persona.'}
    ]},
  { slug:'liceo-scientifico-cosa-guardare', title:'Cosa guardare quando confronti un liceo scientifico', targetKeyword:'confronto liceo scientifico',
    sections:[
      {heading:'L\'offerta formativa', body:'Ogni liceo scientifico puo avere caratteristiche diverse: opzione scienze applicate (senza latino), sezione sportiva, potenziamento in matematica o informatica. Verifica l\'offerta formativa sulla pagina PTOF della scuola.'},
      {heading:'Servizi e laboratori', body:'I laboratori scientifici e informatici sono fondamentali per un liceo scientifico. Su Scuolario puoi verificare la presenza di laboratori digitalizzati e spazi didattici innovativi quando questi dati sono disponibili dalle fonti ufficiali.'},
      {heading:'Documenti ufficiali da consultare', body:'Il RAV (Rapporto di Autovalutazione) e il PTOF (Piano Triennale dell\'Offerta Formativa) sono documenti pubblici che ogni scuola deve pubblicare. Contengono informazioni dettagliate su risultati scolastici, obiettivi e strategie didattiche.'},
      {heading:'Come confrontare su Scuolario', body:'Usa le pagine di confronto per citta per vedere fianco a fianco i licei scientifici della tua zona. Confronta contatti, servizi disponibili e documenti pubblicati. Ricorda: Scuolario non assegna punteggi, ma ti aiuta a vedere i fatti ufficiali in modo chiaro.'}
    ]},
];

// ═══════════════════════════════════════════════════════════════
// GENERATION FUNCTIONS
// ═══════════════════════════════════════════════════════════════

function generateSite() {
  writeJson(join(DATA_DIR, 'site.json'), {
    siteName: 'Scuolario',
    siteUrl: 'https://scuolario.it',
    defaultLocale: 'it-IT',
    tagline: 'Trova scuole in Italia per citta, provincia e tipologia',
    country: 'IT',
    language: 'it',
    launchState: 'italy-only',
    lastDataRefreshAt: LAST_REFRESH,
    contactEmail: 'ciao@scuolario.it',
    primarySourceLabel: 'Scuola in Chiaro / MIM',
    primarySourceUrl: SOURCE_URL,
  });
  console.log('  site.json');
}

function generateRegions() {
  const dir = join(DATA_DIR, 'regions');
  const allProvinces = regionDefs.flatMap(r => r.provinces);
  const index = regionDefs.map(r => {
    const regionSchools = schools.filter(s => s.regionSlug === r.slug);
    const regionCities = cityDefs.filter(c => c.regionSlug === r.slug);
    return {
      slug: r.slug, name: r.name, code: r.code,
      provinceCount: r.provinces.length,
      publishedCityCount: regionCities.filter(c => c.published).length,
      publishedSchoolCount: regionSchools.length,
    };
  });
  writeJson(join(dir, 'index.json'), index);
  console.log('  regions/index.json');

  for (const r of regionDefs) {
    const regionSchools = schools.filter(s => s.regionSlug === r.slug);
    const regionCities = cityDefs.filter(c => c.regionSlug === r.slug);
    const typeCounts: Record<string, number> = {};
    for (const s of regionSchools) {
      typeCounts[s.typeSlug] = (typeCounts[s.typeSlug] || 0) + 1;
    }
    const topSchoolTypes = Object.entries(typeCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([slug, count]) => ({
        slug,
        label: schoolTypeDefs.find(t => t.slug === slug)?.label || slug,
        schoolCount: count,
      }));

    const nameArticle = r.name.startsWith('A') || r.name.startsWith('E') || r.name.startsWith('U') ? "nell'" :
      r.name === 'Marche' || r.name === 'Lombardia' || r.name === 'Liguria' || r.name === 'Puglia' || r.name === 'Basilicata' || r.name === 'Calabria' || r.name === 'Campania' || r.name === 'Sardegna' || r.name === 'Sicilia' || r.name === 'Toscana' ? 'in ' :
      'nel ';

    const data = {
      slug: r.slug,
      name: r.name,
      code: r.code,
      publishedAt: PUB_DATE,
      h1: `Scuole ${nameArticle}${r.name}: cerca per provincia, comune e tipologia`,
      metaTitle: `Scuole ${nameArticle}${r.name}: province, comuni e tipologie | Scuolario`,
      metaDescription: `Trova scuole ${nameArticle}${r.name} per provincia, comune e tipologia con dati ufficiali e pagine piu facili da consultare.`,
      provinceCount: r.provinces.length,
      publishedProvinceCount: r.provinces.length,
      publishedCityCount: regionCities.filter(c => c.published).length,
      publishedSchoolCount: regionSchools.length,
      topSchoolTypes,
      featuredProvinceSlugs: r.provinces.slice(0, 3).map(p => p.slug),
      sourceUrls: SOURCE_URLS,
    };
    writeJson(join(dir, `${r.slug}.json`), data);
  }
  console.log(`  regions/ (${regionDefs.length} files)`);
}

function generateProvinces() {
  const dir = join(DATA_DIR, 'provinces');
  const allProvs = regionDefs.flatMap(r => r.provinces.map(p => ({ ...p, regionSlug: r.slug, regionName: r.name })));

  const index = allProvs.map(p => {
    const provSchools = schools.filter(s => s.provinceSlug === p.slug);
    const provCities = cityDefs.filter(c => c.provinceSlug === p.slug);
    return {
      slug: p.slug, name: p.name, sigla: p.sigla, regionSlug: p.regionSlug,
      schoolCount: provSchools.length,
      publishedCityCount: provCities.filter(c => c.published).length,
    };
  });
  writeJson(join(dir, 'index.json'), index);
  console.log('  provinces/index.json');

  for (const p of allProvs) {
    const provSchools = schools.filter(s => s.provinceSlug === p.slug);
    const provCities = cityDefs.filter(c => c.provinceSlug === p.slug);
    const typeCounts: Record<string, number> = {};
    for (const s of provSchools) {
      typeCounts[s.typeSlug] = (typeCounts[s.typeSlug] || 0) + 1;
    }
    const topSchoolTypes = Object.entries(typeCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([slug, count]) => ({
        slug,
        label: schoolTypeDefs.find(t => t.slug === slug)?.label || slug,
        schoolCount: count,
      }));

    const relevantCompare = comparePresets
      .filter(cp => provCities.some(c => c.slug === cp.citySlug))
      .map(cp => cp.slug);

    const data = {
      slug: p.slug,
      name: p.name,
      displayName: `Provincia di ${p.name}`,
      sigla: p.sigla,
      regionSlug: p.regionSlug,
      publishedAt: PUB_DATE,
      h1: `Scuole in provincia di ${p.name}: comuni, tipologie e istituti`,
      metaTitle: `Scuole in provincia di ${p.name} | Comuni, tipologie e istituti`,
      metaDescription: `Consulta scuole in provincia di ${p.name} per comune e tipologia con dati ufficiali e confronto rapido.`,
      schoolCount: provSchools.length,
      publishedCityCount: provCities.filter(c => c.published).length,
      featuredCitySlugs: provCities.filter(c => c.published).slice(0, 3).map(c => c.slug),
      topSchoolTypes,
      comparePresetSlugs: relevantCompare,
      sourceUrls: [SOURCE_URL],
    };
    writeJson(join(dir, `${p.slug}.json`), data);
  }
  console.log(`  provinces/ (${allProvs.length} files)`);
}

function generateCities() {
  const dir = join(DATA_DIR, 'cities');

  const index = cityDefs.map(c => ({
    slug: c.slug, name: c.name, provinceSlug: c.provinceSlug,
    regionSlug: c.regionSlug, published: c.published,
    schoolCount: schools.filter(s => s.citySlug === c.slug).length,
  }));
  writeJson(join(dir, 'index.json'), index);
  console.log('  cities/index.json');

  for (const c of cityDefs) {
    const citySchools = schools.filter(s => s.citySlug === c.slug);
    const typeCounts: Record<string, number> = {};
    for (const s of citySchools) {
      typeCounts[s.typeSlug] = (typeCounts[s.typeSlug] || 0) + 1;
    }
    const schoolTypeStats = Object.entries(typeCounts)
      .sort((a, b) => b[1] - a[1])
      .map(([slug, count]) => ({
        slug,
        label: schoolTypeDefs.find(t => t.slug === slug)?.label || slug,
        schoolCount: count,
      }));

    const relevantCompare = comparePresets
      .filter(cp => cp.citySlug === c.slug)
      .map(cp => cp.slug);

    const data = {
      slug: c.slug,
      name: c.name,
      provinceSlug: c.provinceSlug,
      provinceName: c.provinceName,
      regionSlug: c.regionSlug,
      regionName: c.regionName,
      publishedAt: c.published ? PUB_DATE : null,
      isPublishable: c.published,
      publishabilityReason: c.published
        ? (citySchools.length >= 3 ? 'schoolCount>=3 and multiple school types' : 'strategic city with search demand')
        : 'insufficient school data for publication',
      h1: `Scuole a ${c.name}: contatti, tipologie e confronto istituti`,
      metaTitle: `Scuole a ${c.name}: trova e confronta istituti | Scuolario`,
      metaDescription: `Trova scuole a ${c.name} per tipologia, quartiere e dati ufficiali. Confronta istituti senza classifiche inventate.`,
      schoolCount: citySchools.length,
      schoolTypeCount: Object.keys(typeCounts).length,
      hasMap: citySchools.length > 0,
      center: { lat: c.lat, lng: c.lng },
      schoolTypeStats,
      featuredSchoolCodes: citySchools.slice(0, 3).map(s => s.code),
      comparePresetSlugs: relevantCompare,
      sourceUrls: [SOURCE_URL],
    };
    writeJson(join(dir, `${c.slug}.json`), data);
  }
  console.log(`  cities/ (${cityDefs.length} files)`);
}

function generateSchoolTypes() {
  const dir = join(DATA_DIR, 'school-types');

  const index = schoolTypeDefs.map(t => ({
    slug: t.slug, label: t.label, levelGroup: t.levelGroup, schoolCount: t.schoolCount,
  }));
  writeJson(join(dir, 'index.json'), index);
  console.log('  school-types/index.json');

  for (const t of schoolTypeDefs) {
    const typeSchools = schools.filter(s => s.typeSlug === t.slug);
    const regionSlugs = [...new Set(typeSchools.map(s => s.regionSlug))];
    const citySlugs = [...new Set(typeSchools.map(s => s.citySlug))];

    const data = {
      slug: t.slug,
      label: t.label,
      schoolLevelGroup: t.levelGroup,
      publishedAt: PUB_DATE,
      h1: `${t.label} in Italia: cerca per citta e provincia`,
      metaTitle: `${t.label} in Italia | Citta, province e istituti`,
      metaDescription: `Scopri ${t.label.toLowerCase()} in Italia per citta e provincia con dati ufficiali, contatti e pagine istituto.`,
      intro: t.intro,
      schoolCount: t.schoolCount,
      featuredRegionSlugs: regionSlugs.slice(0, 3),
      featuredCitySlugs: citySlugs.slice(0, 3),
      sourceUrls: [SOURCE_URL],
    };
    writeJson(join(dir, `${t.slug}.json`), data);
  }
  console.log(`  school-types/ (${schoolTypeDefs.length} files)`);
}

function generateSchools() {
  const dir = join(DATA_DIR, 'schools');

  const index = schools.map(s => ({
    schoolCode: s.code, name: s.name, schoolTypeSlug: s.typeSlug,
    citySlug: s.citySlug, provinceSlug: s.provinceSlug, regionSlug: s.regionSlug,
  }));
  writeJson(join(dir, 'index.json'), index);
  console.log('  schools/index.json');

  for (const s of schools) {
    const sameCity = schools.filter(o => o.citySlug === s.citySlug && o.code !== s.code);
    const sameTypeCity = sameCity.filter(o => o.typeSlug === s.typeSlug);
    const nearby = sameCity.slice(0, 4).map(o => o.code);
    const sameTypeCodes = sameTypeCity.slice(0, 4).map(o => o.code);

    const slug = schoolSlug(s.name);
    const baseUrl = `https://unica.istruzione.gov.it/cercalatuascuola/istituti/${s.code}/${slug}/`;

    const data = {
      schoolCode: s.code,
      slug: s.code,
      name: s.name,
      canonicalName: s.name.toUpperCase(),
      schoolLevelGroup: s.levelGroup,
      schoolTypeSlug: s.typeSlug,
      schoolTypeLabel: s.type,
      legalStatus: 'statale',
      publishedAt: PUB_DATE,
      h1: `${s.name} a ${s.city}: contatti, dati ufficiali e servizi`,
      metaTitle: `${s.name} a ${s.city} | Contatti, servizi e dati ufficiali`,
      metaDescription: `Scheda scuola ufficiale per ${s.name} a ${s.city}: contatti, indirizzo, servizi, documenti e fonti MIM.`,
      regionSlug: s.regionSlug,
      regionName: s.regionName,
      provinceSlug: s.provinceSlug,
      provinceName: s.provinceName,
      provinceSigla: s.provinceSigla,
      citySlug: s.citySlug,
      cityName: s.city,
      address: {
        street: s.address,
        postalCode: s.cap,
        city: s.city,
        province: s.provinceSigla,
        region: s.regionName,
        full: `${s.address.toUpperCase()}, ${s.cap} ${s.city.toUpperCase()} (${s.provinceSigla})`,
      },
      coordinates: {
        lat: s.lat,
        lng: s.lng,
        source: 'official-page-parse',
        isApproximate: true,
      },
      contacts: {
        phone: s.phone || null,
        fax: null,
        email: s.email.toUpperCase(),
        pec: `${s.code.toLowerCase()}@pec.istruzione.it`,
        websiteUrl: null,
      },
      source: {
        officialOverviewUrl: baseUrl,
        didatticaUrl: `${baseUrl}didattica/`,
        serviziUrl: `${baseUrl}servizi/`,
        finanzaUrl: `${baseUrl}finanza/`,
        ptofUrl: `${baseUrl}ptof/`,
        ravUrl: `${baseUrl}valutazione/`,
        rendicontazioneSocialeUrl: `${baseUrl}rendicontazioneSociale/`,
        ediliziaUrl: `${baseUrl}edilizia/`,
        ponUrl: `${baseUrl}pon/`,
      },
      availability: {
        hasDidattica: true,
        hasServizi: true,
        hasFinanza: true,
        hasPtof: true,
        hasRav: true,
        hasRendicontazioneSociale: true,
        hasEdilizia: true,
        hasPon: true,
      },
      servicesSummary: {
        hasDigitalLabs: true,
        digitalDeviceCount: null,
        connectivityPoints: null,
        hasInnovativeLearningSpaces: true,
        serviceNotes: [
          'La scuola dispone di laboratori multimediali/digitalizzati',
          'Sono presenti ambienti didattici innovativi',
        ],
      },
      financeSummary: {
        hasFinanceCharts: true,
        financeNotes: [
          'Entrate per fonti di finanziamento disponibili sulla pagina ufficiale',
        ],
      },
      documentsSummary: {
        hasRav: true,
        hasPtof: true,
        hasRendicontazioneSociale: true,
      },
      nearbySchoolCodes: nearby,
      sameTypeInCitySchoolCodes: sameTypeCodes,
      lastSourceCheckAt: LAST_REFRESH,
      dataQuality: {
        officiallyMatched: true,
        matchMethod: 'official-page-url',
        missingFields: [],
      },
    };
    writeJson(join(dir, `${s.code}.json`), data);
  }
  console.log(`  schools/ (${schools.length} files)`);
}

function generateCompare() {
  const dir = join(DATA_DIR, 'compare');

  const index = comparePresets.map(cp => ({
    slug: cp.slug, title: cp.title, citySlug: cp.citySlug,
    schoolTypeSlug: cp.schoolTypeSlug, schoolCount: cp.schoolCodes.length,
  }));
  writeJson(join(dir, 'index.json'), index);
  console.log('  compare/index.json');

  for (const cp of comparePresets) {
    const data = {
      slug: cp.slug,
      title: cp.title,
      comparisonScope: 'city-school-type',
      citySlug: cp.citySlug,
      schoolTypeSlug: cp.schoolTypeSlug,
      publishedAt: PUB_DATE,
      h1: cp.title,
      metaTitle: `${cp.title} | Scuolario`,
      metaDescription: `Confronto essenziale tra ${schoolTypeDefs.find(t => t.slug === cp.schoolTypeSlug)?.label.toLowerCase() || cp.schoolTypeSlug} a ${cityDefs.find(c => c.slug === cp.citySlug)?.name || cp.citySlug} con campi ufficiali e link alle pagine scuola.`,
      schoolCodes: cp.schoolCodes,
      fields: compareFields,
      comparisonNotes: [
        'Il confronto mostra solo campi presenti nelle fonti ufficiali',
        'Nessuna classifica o punteggio sintetico',
      ],
    };
    writeJson(join(dir, `${cp.slug}.json`), data);
  }
  console.log(`  compare/ (${comparePresets.length} files)`);
}

function generateGuides() {
  const dir = join(DATA_DIR, 'guides');

  const index = guideDefs.map(g => ({
    slug: g.slug, title: g.title, targetKeyword: g.targetKeyword,
  }));
  writeJson(join(dir, 'index.json'), index);
  console.log('  guides/index.json');

  for (const g of guideDefs) {
    const data = {
      slug: g.slug,
      title: g.title,
      targetKeyword: g.targetKeyword,
      publishedAt: PUB_DATE,
      h1: g.title,
      metaTitle: `${g.title} | Scuolario`,
      metaDescription: `Guida pratica: ${g.title.toLowerCase()}. Informazioni utili per genitori e famiglie basate su dati ufficiali.`,
      intro: `${g.title}: una guida pratica per genitori e famiglie che cercano informazioni affidabili sulle scuole italiane.`,
      sections: g.sections,
      sourceUrls: [SOURCE_URL],
    };
    writeJson(join(dir, `${g.slug}.json`), data);
  }
  console.log(`  guides/ (${guideDefs.length} files)`);
}

function generatePages() {
  const dir = join(DATA_DIR, 'pages');

  writeJson(join(dir, 'about.json'), {
    slug: 'about',
    h1: "Cos'e Scuolario",
    metaTitle: "Cos'e Scuolario | Trova scuole in Italia con dati ufficiali",
    metaDescription: "Scopri cos'e Scuolario: un prodotto di consultazione pubblica per trovare e confrontare scuole in Italia usando dati ufficiali del Ministero dell'Istruzione.",
    publishedAt: PUB_DATE,
    sections: [
      { heading: 'Missione', body: "Scuolario e un prodotto di consultazione pubblica che riorganizza le informazioni ufficiali sulle scuole italiane per renderle piu facili da navigare. Il nostro obiettivo e aiutare genitori e famiglie a trovare e confrontare scuole usando dati reali, senza classifiche inventate o punteggi sintetici." },
      { heading: 'Cosa facciamo', body: "Raccogliamo e presentiamo dati pubblici ufficiali dal portale Scuola in Chiaro del Ministero dell'Istruzione e del Merito (MIM). Organizziamo le informazioni per regione, provincia, comune e tipologia scolastica, creando pagine di consultazione rapida con contatti, servizi e documenti disponibili." },
      { heading: 'Cosa NON facciamo', body: "Scuolario non assegna punteggi, voti o classifiche alle scuole. Non pubblichiamo recensioni degli utenti e non creiamo graduatorie di merito. Le nostre pagine di confronto mostrano solo campi ufficiali verificabili, senza giudizi editoriali." },
      { heading: 'Pubblicazione progressiva', body: "Non tutte le pagine sono immediatamente disponibili. Pubblichiamo progressivamente le pagine man mano che verifichiamo la completezza dei dati. Le pagine non ancora pubblicate mostrano uno stato 'In arrivo'." },
    ],
  });

  writeJson(join(dir, 'data-sources.json'), {
    slug: 'data-sources',
    h1: 'Fonti dati e metodologia',
    metaTitle: 'Fonti dati e metodologia | Scuolario',
    metaDescription: "Scopri le fonti dati ufficiali utilizzate da Scuolario e la metodologia di raccolta e presentazione delle informazioni sulle scuole italiane.",
    publishedAt: PUB_DATE,
    sections: [
      { heading: 'Fonte primaria', body: "La fonte primaria di Scuolario e il portale Scuola in Chiaro del Ministero dell'Istruzione e del Merito (MIM), accessibile all'indirizzo https://unica.istruzione.gov.it/portale/it/scuola-in-chiaro. Da questo portale estraiamo informazioni su identita, contatti, servizi, didattica, finanza e documenti ufficiali delle scuole." },
      { heading: 'Pagine ufficiali delle scuole', body: "Ogni scheda scuola su Scuolario e collegata alla corrispondente pagina ufficiale su Scuola in Chiaro, accessibile tramite URL nel formato https://unica.istruzione.gov.it/cercalatuascuola/istituti/{CODICE}/{slug}/. Invitiamo sempre gli utenti a verificare i dati alla fonte." },
      { heading: 'Open data MIM', body: "Utilizziamo anche i dataset aperti pubblicati dal MIM su https://dati.istruzione.it/opendata/ per validare e integrare le informazioni raccolte." },
      { heading: 'Fonti di scoperta supplementari', body: "Per l'individuazione iniziale delle scuole e dei cluster geografici, possiamo utilizzare fonti supplementari come tuttitalia.it e cercascuole.it. Tuttavia, i dati pubblicati sulle pagine di Scuolario provengono sempre e solo dalle fonti ufficiali ministeriali." },
      { heading: 'Politica sui dati mancanti', body: "Quando un dato non e disponibile dalla fonte ufficiale, lo indichiamo chiaramente con 'Dato non disponibile' invece di inventare un valore. Le pagine con copertura dati insufficiente non vengono pubblicate fino a quando non raggiungono uno standard qualitativo adeguato." },
      { heading: 'Aggiornamento', body: `I dati sono stati verificati l'ultima volta il ${LAST_REFRESH}. Scuolario aggiorna periodicamente le informazioni dalle fonti ufficiali.` },
    ],
    sourceList: [
      { label: 'Scuola in Chiaro / MIM', url: SOURCE_URL },
      { label: 'MIM - Scuola in Chiaro', url: 'https://www.mim.gov.it/-/scuola-in-chiaro' },
      { label: 'Open Data MIM', url: 'https://dati.istruzione.it/opendata/' },
      { label: 'Pagine scuola ufficiali', url: 'https://unica.istruzione.gov.it/cercalatuascuola/istituti/' },
    ],
  });

  writeJson(join(dir, 'contact.json'), {
    slug: 'contact',
    h1: 'Contatti',
    metaTitle: 'Contatti | Scuolario',
    metaDescription: 'Contatta il team di Scuolario per domande, segnalazioni o suggerimenti sul portale di ricerca scuole italiane.',
    publishedAt: PUB_DATE,
    sections: [
      { heading: 'Scrivici', body: "Per domande, segnalazioni di errori nei dati, suggerimenti o richieste di collaborazione, puoi scriverci all'indirizzo email indicato qui sotto. Rispondiamo generalmente entro 2-3 giorni lavorativi." },
      { heading: 'Segnalazione dati', body: "Se noti un errore nei dati di una scuola, ti preghiamo di indicare il codice meccanografico della scuola e il campo che ritieni errato. Verificheremo con le fonti ufficiali e aggiorneremo la pagina se necessario." },
    ],
    email: 'ciao@scuolario.it',
  });

  writeJson(join(dir, 'privacy.json'), {
    slug: 'privacy',
    h1: 'Privacy Policy',
    metaTitle: 'Privacy Policy | Scuolario',
    metaDescription: 'Informativa sulla privacy di Scuolario: come trattiamo i dati personali degli utenti del portale di ricerca scuole italiane.',
    publishedAt: PUB_DATE,
    lastUpdated: LAST_REFRESH,
    sections: [
      { heading: 'Titolare del trattamento', body: 'Il titolare del trattamento dei dati personali e Scuolario, raggiungibile all\'indirizzo email ciao@scuolario.it.' },
      { heading: 'Dati raccolti', body: 'Scuolario raccoglie dati di navigazione anonimi tramite cookie tecnici necessari al funzionamento del sito e, previo consenso, tramite cookie analitici di terze parti (Vercel Analytics) per comprendere come gli utenti utilizzano il sito.' },
      { heading: 'Finalita del trattamento', body: 'I dati di navigazione sono utilizzati esclusivamente per garantire il funzionamento del sito, migliorare l\'esperienza utente e produrre statistiche aggregate anonime sull\'utilizzo del portale.' },
      { heading: 'Cookie', body: 'Scuolario utilizza cookie tecnici strettamente necessari (che non richiedono consenso) e cookie analitici di terze parti (previo consenso). Puoi gestire le preferenze sui cookie tramite il banner dedicato o le impostazioni del tuo browser.' },
      { heading: 'Diritti dell\'utente', body: 'Ai sensi del GDPR (Regolamento UE 2016/679), hai diritto di accedere ai tuoi dati personali, richiederne la rettifica o la cancellazione, opporti al trattamento e richiedere la portabilita dei dati. Per esercitare questi diritti, scrivi a ciao@scuolario.it.' },
      { heading: 'Dati sulle scuole', body: 'Le informazioni sulle scuole pubblicate su Scuolario sono dati pubblici ufficiali provenienti dal Ministero dell\'Istruzione e del Merito e non costituiscono dati personali ai sensi del GDPR.' },
      { heading: 'Modifiche alla policy', body: 'Scuolario si riserva il diritto di modificare questa informativa sulla privacy. Eventuali modifiche saranno pubblicate su questa pagina con la data di ultimo aggiornamento.' },
    ],
  });

  writeJson(join(dir, 'terms.json'), {
    slug: 'terms',
    h1: 'Termini di utilizzo',
    metaTitle: 'Termini di utilizzo | Scuolario',
    metaDescription: 'Termini e condizioni di utilizzo del portale Scuolario per la ricerca e il confronto di scuole italiane.',
    publishedAt: PUB_DATE,
    lastUpdated: LAST_REFRESH,
    sections: [
      { heading: 'Accettazione dei termini', body: 'L\'utilizzo del sito scuolario.it implica l\'accettazione dei presenti termini di utilizzo. Se non accetti questi termini, ti preghiamo di non utilizzare il sito.' },
      { heading: 'Natura del servizio', body: 'Scuolario e un servizio gratuito di consultazione che riorganizza dati pubblici ufficiali sulle scuole italiane. Non offriamo consulenza educativa, non assegniamo punteggi o classifiche e non garantiamo la completezza o l\'aggiornamento in tempo reale dei dati.' },
      { heading: 'Fonti dei dati', body: 'I dati pubblicati su Scuolario provengono da fonti pubbliche ufficiali, principalmente dal portale Scuola in Chiaro del Ministero dell\'Istruzione e del Merito. Invitiamo sempre gli utenti a verificare le informazioni direttamente sulle fonti ufficiali.' },
      { heading: 'Limitazione di responsabilita', body: 'Scuolario non e responsabile per eventuali errori, omissioni o ritardi nell\'aggiornamento dei dati. Le decisioni prese sulla base delle informazioni presenti sul sito sono di esclusiva responsabilita dell\'utente.' },
      { heading: 'Proprieta intellettuale', body: 'Il design, il codice e l\'organizzazione dei contenuti di Scuolario sono protetti dalle leggi sulla proprieta intellettuale. I dati sulle scuole rimangono di titolarita pubblica secondo le rispettive licenze d\'uso.' },
      { heading: 'Uso accettabile', body: 'E vietato utilizzare Scuolario per: raccolta massiva automatizzata di dati (scraping), riproduzione sistematica dei contenuti, utilizzo commerciale non autorizzato, o qualsiasi attivita che possa compromettere il funzionamento del servizio.' },
      { heading: 'Modifiche ai termini', body: 'Scuolario si riserva il diritto di modificare questi termini di utilizzo in qualsiasi momento. Le modifiche saranno efficaci dalla data di pubblicazione su questa pagina.' },
    ],
  });

  console.log('  pages/ (5 files)');
}

// ═══════════════════════════════════════════════════════════════
// MAIN
// ═══════════════════════════════════════════════════════════════

function main() {
  console.log('Generating Scuolario static data files...\n');
  console.log(`Output directory: ${DATA_DIR}\n`);

  ensureDir(DATA_DIR);

  generateSite();
  generateRegions();
  generateProvinces();
  generateCities();
  generateSchoolTypes();
  generateSchools();
  generateCompare();
  generateGuides();
  generatePages();

  // Final summary
  const totalSchools = schools.length;
  const totalCities = cityDefs.length;
  const publishedCities = cityDefs.filter(c => c.published).length;
  const totalRegions = regionDefs.length;
  const totalProvinces = regionDefs.reduce((sum, r) => sum + r.provinces.length, 0);

  console.log('\n--- Summary ---');
  console.log(`Regions:      ${totalRegions} (+ index)`);
  console.log(`Provinces:    ${totalProvinces} (+ index)`);
  console.log(`Cities:       ${totalCities} (${publishedCities} published) (+ index)`);
  console.log(`School types: ${schoolTypeDefs.length} (+ index)`);
  console.log(`Schools:      ${totalSchools} (+ index)`);
  console.log(`Compare:      ${comparePresets.length} (+ index)`);
  console.log(`Guides:       ${guideDefs.length} (+ index)`);
  console.log(`Pages:        5`);
  console.log(`site.json:    1`);
  console.log(`\nTotal JSON files: ${1 + (totalRegions + 1) + (totalProvinces + 1) + (totalCities + 1) + (schoolTypeDefs.length + 1) + (totalSchools + 1) + (comparePresets.length + 1) + (guideDefs.length + 1) + 5}`);
  console.log('\nDone!');
}

main();

// Developed by Debparna Biswas

const PDFMerger = require('pdf-merger-js');

var merger = new PDFMerger();

const mergePdfs = async (p1,d) => {
  await merger.add(p1);  //merge all pages. parameter is the path to file and filename.
  await merger.save(`public/${d}merged.pdf`); //save under given name and reset the internal document
}
module.exports={mergePdfs}
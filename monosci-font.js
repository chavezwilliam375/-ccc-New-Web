const MONOSCI_DESIGN_WIDTH = 1920;
const MONOSCI_CHARACTERS = [
  ..."ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  ..."abcdefghijklmnopqrstuvwxyz",
  ..."0123456789",
];
const MONOSCI_STYLE_KEYS = ["round", "angular", "extended"];
const MONOSCI_STYLE_LABELS = {
  round: "Round",
  angular: "Angular",
  extended: "Angular Extended",
};
const MONOSCI_SVG_NAMESPACE = "http://www.w3.org/2000/svg";
const MONOSCI_SCENE_HEIGHT = 6834;
const MONOSCI_GRID_FIRST_CENTER_X = 258;
const MONOSCI_GRID_FIRST_CENTER_Y = 3671;
const MONOSCI_GRID_CELL_WIDTH = 58;
const MONOSCI_GRID_CELL_HEIGHT = 58;
const MONOSCI_EXTENDED_GUIDE_SCALES = {
  ascender: 1.0183586,
  xHeight: 1.0007291,
};
const MONOSCI_ANGULAR_GUIDE_SCALES = {
  capHeight: 1.0004822,
  ascender: MONOSCI_EXTENDED_GUIDE_SCALES.ascender,
  xHeight: MONOSCI_EXTENDED_GUIDE_SCALES.xHeight,
};
const MONOSCI_GLYPHS = [{"file":"a2e58.svg","left":"calc(50% + 307px)","top":"57.68%","bottom":"41.88%","width":"16px"},{"file":"dc51a.svg","left":"calc(50% + 368px)","top":"57.68%","bottom":"41.88%","width":"16px"},{"file":"a3d0a.svg","left":"calc(50% + 430.5px)","top":"57.68%","bottom":"41.88%","width":"17px"},{"file":"0398f.svg","left":"calc(50% + 494.5px)","top":"57.68%","bottom":"41.88%","width":"17px"},{"file":"24b22.svg","left":"calc(50% + 554.5px)","top":"57.68%","bottom":"41.88%","width":"17px"},{"file":"dbc25.svg","left":"calc(50% + 618.5px)","top":"57.68%","bottom":"41.88%","width":"17px"},{"file":"17f2e.svg","left":"calc(50% + 679.5px)","top":"57.68%","bottom":"41.88%","width":"17px"},{"file":"798d0.svg","left":"calc(50% + 742px)","top":"57.68%","bottom":"41.88%","width":"18px"},{"file":"151ee.svg","left":"calc(50% + 804px)","top":"57.68%","bottom":"41.88%","width":"14px"},{"file":"36bef.svg","left":"calc(50% + 867px)","top":"57.68%","bottom":"41.88%","width":"16px"},{"file":"fc48b.svg","left":"calc(50% + 180.5px)","top":"58.6%","bottom":"40.96%","width":"17px"},{"file":"d4f41.svg","left":"calc(50% + 243.5px)","top":"58.6%","bottom":"40.96%","width":"15px"},{"file":"c6f4a.svg","left":"calc(50% + 305.5px)","top":"58.6%","bottom":"40.96%","width":"19px"},{"file":"5588c.svg","left":"calc(50% + 368px)","top":"58.6%","bottom":"40.96%","width":"18px"},{"file":"a33ea.svg","left":"calc(50% + 431px)","top":"58.6%","bottom":"40.96%","width":"18px"},{"file":"99cd0.svg","left":"calc(50% + 494px)","top":"58.6%","bottom":"40.96%","width":"16px"},{"file":"0e813.svg","left":"calc(50% + 554.5px)","top":"58.6%","bottom":"40.96%","width":"19px"},{"file":"b82b0.svg","left":"calc(50% + 618px)","top":"58.6%","bottom":"40.96%","width":"18px"},{"file":"cc7dd.svg","left":"calc(50% + 679px)","top":"58.6%","bottom":"40.96%","width":"18px"},{"file":"2ed25.svg","left":"calc(50% + 741.5px)","top":"58.6%","bottom":"40.96%","width":"17px"},{"file":"685cf.svg","left":"calc(50% + 804px)","top":"58.6%","bottom":"40.96%","width":"18px"},{"file":"660b1.svg","left":"calc(50% + 866.5px)","top":"58.6%","bottom":"40.96%","width":"19px"},{"file":"09eef.svg","left":"calc(50% + 180.5px)","top":"59.5%","bottom":"40.06%","width":"19px"},{"file":"3f125.svg","left":"calc(50% + 244px)","top":"59.5%","bottom":"40.06%","width":"18px"},{"file":"2adc1.svg","left":"calc(50% + 306px)","top":"59.5%","bottom":"40.06%","width":"18px"},{"file":"d17bb.svg","left":"calc(50% + 368px)","top":"59.5%","bottom":"40.06%","width":"18px"},{"file":"d9422.svg","left":"calc(50% + 430.5px)","top":"59.67%","bottom":"40.06%","width":"17px"},{"file":"74eda.svg","left":"calc(50% + 494px)","top":"59.53%","bottom":"40.06%","width":"18px"},{"file":"4aa32.svg","left":"calc(50% + 554.5px)","top":"59.67%","bottom":"40.06%","width":"17px"},{"file":"f9f1f.svg","left":"calc(50% + 617.5px)","top":"59.53%","bottom":"40.06%","width":"17px"},{"file":"498aa.svg","left":"calc(50% + 679.5px)","top":"59.67%","bottom":"40.06%","width":"17px"},{"file":"cbcc5.svg","left":"calc(50% + 742.5px)","top":"59.53%","bottom":"40.06%","width":"17px"},{"file":"e8b4c.svg","left":"calc(50% + 803.5px)","top":"59.67%","bottom":"39.93%","width":"17px"},{"file":"86fd7.svg","left":"calc(50% + 866px)","top":"59.53%","bottom":"40.06%","width":"18px"},{"file":"4b884.svg","left":"calc(50% + 181px)","top":"60.45%","bottom":"39.17%","width":"14px"},{"file":"0c073.svg","left":"calc(50% + 244px)","top":"60.45%","bottom":"39.17%","width":"12px"},{"file":"61f67.svg","left":"calc(50% + 305.5px)","top":"60.4%","bottom":"39.17%","width":"17px"},{"file":"31ded.svg","left":"calc(50% + 368px)","top":"60.42%","bottom":"39.17%","width":"14px"},{"file":"3044c.svg","left":"calc(50% + 431px)","top":"60.56%","bottom":"39.17%","width":"18px"},{"file":"a4060.svg","left":"calc(50% + 494.5px)","top":"60.56%","bottom":"39.17%","width":"17px"},{"file":"822c5.svg","left":"calc(50% + 554.5px)","top":"60.56%","bottom":"39.17%","width":"17px"},{"file":"7c9b0.svg","left":"calc(50% + 617.5px)","top":"60.56%","bottom":"39.17%","width":"17px"},{"file":"41734.svg","left":"calc(50% + 679.5px)","top":"60.56%","bottom":"39.17%","width":"17px"},{"file":"55ea0.svg","left":"calc(50% + 742px)","top":"60.56%","bottom":"39.17%","width":"16px"},{"file":"fc5ed.svg","left":"calc(50% + 804px)","top":"60.56%","bottom":"39.17%","width":"18px"},{"file":"c33b1.svg","left":"calc(50% + 867px)","top":"60.49%","bottom":"39.17%","width":"16px"},{"file":"ee4e0.svg","left":"calc(50% + 180.5px)","top":"61.49%","bottom":"38.24%","width":"17px"},{"file":"1ed2d.svg","left":"calc(50% + 244.5px)","top":"61.49%","bottom":"38.24%","width":"17px"},{"file":"1afb4.svg","left":"calc(50% + 306px)","top":"61.49%","bottom":"38.24%","width":"18px"},{"file":"3cbf4.svg","left":"calc(50% + 367.5px)","top":"61.49%","bottom":"38.24%","width":"17px"},{"file":"2c390.svg","left":"calc(50% + 431.5px)","top":"61.49%","bottom":"38.24%","width":"17px"},{"file":"faf6c.svg","left":"calc(50% + 496px)","top":"61.49%","bottom":"38.24%","width":"16px"},{"file":"513c4.svg","left":"calc(50% + 430.5px)","top":"62.26%","bottom":"37.33%","width":"37px"},{"file":"427a6.svg","left":"calc(50% + 494.5px)","top":"62.26%","bottom":"37.33%","width":"37px"},{"file":"d5b1f.svg","left":"calc(50% + 554.5px)","top":"62.26%","bottom":"37.33%","width":"37px"},{"file":"25c30.svg","left":"calc(50% + 617.5px)","top":"62.26%","bottom":"37.33%","width":"37px"},{"file":"be355.svg","left":"calc(50% + 678.5px)","top":"62.26%","bottom":"37.33%","width":"37px"},{"file":"5b937.svg","left":"calc(50% + 742.5px)","top":"62.26%","bottom":"37.33%","width":"37px"},{"file":"be5dc.svg","left":"calc(50% + 803.5px)","top":"62.26%","bottom":"37.33%","width":"37px"},{"file":"0615a.svg","left":"calc(50% + 866.5px)","top":"62.26%","bottom":"37.33%","width":"37px"},{"file":"cd474.svg","left":"calc(50% + 180.5px)","top":"63.17%","bottom":"36.42%","width":"35px"},{"file":"fc309.svg","left":"calc(50% + 243.5px)","top":"63.17%","bottom":"36.42%","width":"37px"},{"file":"09a5a.svg","left":"calc(50% + 305.5px)","top":"63.15%","bottom":"36.42%","width":"33px"},{"file":"9a8e8.svg","left":"calc(50% + 368.5px)","top":"63.17%","bottom":"36.42%","width":"37px"},{"file":"84636.svg","left":"calc(50% + 430.5px)","top":"63.17%","bottom":"36.42%","width":"37px"},{"file":"b128f.svg","left":"calc(50% + 494.5px)","top":"63.17%","bottom":"36.42%","width":"37px"},{"file":"5e634.svg","left":"calc(50% + 554.5px)","top":"63.17%","bottom":"36.42%","width":"37px"},{"file":"7ff62.svg","left":"calc(50% + 617.5px)","top":"63.17%","bottom":"36.42%","width":"37px"},{"file":"7413b.svg","left":"calc(50% + 679.5px)","top":"63.17%","bottom":"36.42%","width":"37px"},{"file":"fb67a.svg","left":"calc(50% + 742.5px)","top":"63.17%","bottom":"36.42%","width":"37px"},{"file":"517c1.svg","left":"calc(50% + 803.5px)","top":"63.17%","bottom":"36.42%","width":"37px"},{"file":"c066d.svg","left":"calc(50% + 866.5px)","top":"63.17%","bottom":"36.42%","width":"37px"},{"file":"bcf7e.svg","left":"calc(50% + 181.5px)","top":"64.09%","bottom":"35.5%","width":"37px"},{"file":"de149.svg","left":"calc(50% + 244.5px)","top":"64.09%","bottom":"35.48%","width":"39px"},{"file":"f918d.svg","left":"calc(50% + 305.5px)","top":"64.09%","bottom":"35.5%","width":"37px"},{"file":"e5027.svg","left":"calc(50% + 368px)","top":"64.09%","bottom":"35.5%","width":"38px"},{"file":"c7a74.svg","left":"calc(50% + 431px)","top":"64.08%","bottom":"35.5%","width":"38px"},{"file":"f7bc9.svg","left":"calc(50% + 494.5px)","top":"64.09%","bottom":"35.5%","width":"37px"},{"file":"4a931.svg","left":"calc(50% + 554.5px)","top":"64.22%","bottom":"35.5%","width":"37px"},{"file":"4f1b8.svg","left":"calc(50% + 616.5px)","top":"64.09%","bottom":"35.5%","width":"37px"},{"file":"fe071.svg","left":"calc(50% + 678.5px)","top":"64.22%","bottom":"35.5%","width":"37px"},{"file":"42a8c.svg","left":"calc(50% + 740.5px)","top":"64.09%","bottom":"35.5%","width":"37px"},{"file":"99762.svg","left":"calc(50% + 802.5px)","top":"64.22%","bottom":"35.5%","width":"37px"},{"file":"8c0ea.svg","left":"calc(50% + 864.5px)","top":"64.09%","bottom":"35.5%","width":"37px"},{"file":"611cb.svg","left":"calc(50% + 180.5px)","top":"65.12%","bottom":"34.53%","width":"37px"},{"file":"a42ad.svg","left":"calc(50% + 245.5px)","top":"64.98%","bottom":"34.61%","width":"37px"},{"file":"8e078.svg","left":"calc(50% + 303.5px)","top":"64.98%","bottom":"34.61%","width":"37px"},{"file":"633fe.svg","left":"calc(50% + 367.5px)","top":"64.98%","bottom":"34.61%","width":"37px"},{"file":"0cf5d.svg","left":"calc(50% + 430.5px)","top":"64.98%","bottom":"34.61%","width":"37px"},{"file":"8f6fd.svg","left":"calc(50% + 494.5px)","top":"64.98%","bottom":"34.61%","width":"37px"},{"file":"3319c.svg","left":"calc(50% + 556.5px)","top":"65.12%","bottom":"34.61%","width":"37px"},{"file":"47c1a.svg","left":"calc(50% + 618.5px)","top":"65.12%","bottom":"34.61%","width":"37px"},{"file":"a3f75.svg","left":"calc(50% + 680.5px)","top":"65.12%","bottom":"34.61%","width":"37px"},{"file":"3057c.svg","left":"calc(50% + 742.5px)","top":"65.12%","bottom":"34.61%","width":"37px"},{"file":"86d57.svg","left":"calc(50% + 804.5px)","top":"65.12%","bottom":"34.61%","width":"37px"},{"file":"c7abb.svg","left":"calc(50% + 866.5px)","top":"65.12%","bottom":"34.61%","width":"37px"},{"file":"111ef.svg","left":"calc(50% + 181.5px)","top":"66.04%","bottom":"33.68%","width":"39px"},{"file":"113b0.svg","left":"calc(50% + 244.5px)","top":"65.98%","bottom":"33.68%","width":"37px"},{"file":"0b9e6.svg","left":"calc(50% + 306.5px)","top":"66.04%","bottom":"33.7%","width":"37px"},{"file":"00de7.svg","left":"calc(50% + 369px)","top":"66.02%","bottom":"33.68%","width":"38px"},{"file":"b80ea.svg","left":"calc(50% + 431.5px)","top":"66.04%","bottom":"33.7%","width":"37px"},{"file":"c953b.svg","left":"calc(50% + 493.5px)","top":"66.02%","bottom":"33.68%","width":"37px"},{"file":"837c3.svg","left":"calc(50% + 555.5px)","top":"66.04%","bottom":"33.7%","width":"37px"},{"file":"f6fde.svg","left":"calc(50% + 617px)","top":"66.04%","bottom":"33.7%","width":"36px"},{"file":"60757.svg","left":"calc(50% + 181px)","top":"53.07%","bottom":"46.52%","width":"16px"},{"file":"fa02d.svg","left":"calc(50% + 243.5px)","top":"53.07%","bottom":"46.52%","width":"17px"},{"file":"545e8.svg","left":"calc(50% + 305.5px)","top":"53.06%","bottom":"46.52%","width":"17px"},{"file":"71348.svg","left":"calc(50% + 368px)","top":"53.07%","bottom":"46.52%","width":"16px"},{"file":"d5935.svg","left":"calc(50% + 431px)","top":"53.07%","bottom":"46.52%","width":"16px"},{"file":"34ef5.svg","left":"calc(50% + 494px)","top":"53.07%","bottom":"46.52%","width":"16px"},{"file":"1b17d.svg","left":"calc(50% + 554.5px)","top":"53.06%","bottom":"46.52%","width":"17px"},{"file":"44c6c.svg","left":"calc(50% + 618px)","top":"53.07%","bottom":"46.52%","width":"18px"},{"file":"cf62a.svg","left":"calc(50% + 679.5px)","top":"53.07%","bottom":"46.52%","width":"11px"},{"file":"cfb5a.svg","left":"calc(50% + 742px)","top":"53.07%","bottom":"46.52%","width":"16px"},{"file":"0cbb5.svg","left":"calc(50% + 804.5px)","top":"53.07%","bottom":"46.52%","width":"17px"},{"file":"d662c.svg","left":"calc(50% + 866.5px)","top":"53.07%","bottom":"46.52%","width":"17px"},{"file":"e0fde.svg","left":"calc(50% + 180.5px)","top":"54.1%","bottom":"45.49%","width":"17px"},{"file":"cbaec.svg","left":"calc(50% + 243.5px)","top":"54.1%","bottom":"45.49%","width":"17px"},{"file":"d6575.svg","left":"calc(50% + 306px)","top":"54.08%","bottom":"45.49%","width":"18px"},{"file":"e6175.svg","left":"calc(50% + 368.5px)","top":"54.1%","bottom":"45.49%","width":"17px"},{"file":"9c815.svg","left":"calc(50% + 430.5px)","top":"54.08%","bottom":"45.49%","width":"17px"},{"file":"56730.svg","left":"calc(50% + 494.5px)","top":"54.1%","bottom":"45.49%","width":"17px"},{"file":"63123.svg","left":"calc(50% + 554px)","top":"54.08%","bottom":"45.49%","width":"18px"},{"file":"49f58.svg","left":"calc(50% + 617.5px)","top":"54.1%","bottom":"45.49%","width":"19px"},{"file":"3437a.svg","left":"calc(50% + 679.5px)","top":"54.1%","bottom":"45.49%","width":"17px"},{"file":"70e19.svg","left":"calc(50% + 742.5px)","top":"54.1%","bottom":"45.49%","width":"17px"},{"file":"db9ac.svg","left":"calc(50% + 803.5px)","top":"54.1%","bottom":"45.49%","width":"19px"},{"file":"9160a.svg","left":"calc(50% + 866.5px)","top":"54.1%","bottom":"45.49%","width":"17px"},{"file":"97dd2.svg","left":"calc(50% + 180.5px)","top":"55.05%","bottom":"44.54%","width":"17px"},{"file":"c69ca.svg","left":"calc(50% + 244px)","top":"55.05%","bottom":"44.54%","width":"18px"},{"file":"212d6.svg","left":"calc(50% + 305.23px)","top":"55.17%","bottom":"44.55%","width":"16.45px"},{"file":"f4d6a.svg","left":"calc(50% + 368px)","top":"55.03%","bottom":"44.54%","width":"16px"},{"file":"602f1.svg","left":"calc(50% + 431px)","top":"55.17%","bottom":"44.54%","width":"16px"},{"file":"cbd9d.svg","left":"calc(50% + 494.5px)","top":"55.03%","bottom":"44.54%","width":"17px"},{"file":"cabcf.svg","left":"calc(50% + 554px)","top":"55.17%","bottom":"44.54%","width":"16px"},{"file":"182f7.svg","left":"calc(50% + 618.5px)","top":"55.05%","bottom":"44.54%","width":"17px"},{"file":"72b4d.svg","left":"calc(50% + 679px)","top":"55.06%","bottom":"44.54%","width":"16px"},{"file":"b9084.svg","left":"calc(50% + 742.5px)","top":"55.05%","bottom":"44.54%","width":"17px"},{"file":"b7a52.svg","left":"calc(50% + 804px)","top":"55.06%","bottom":"44.54%","width":"14px"},{"file":"6f350.svg","left":"calc(50% + 866.5px)","top":"55.06%","bottom":"44.42%","width":"17px"},{"file":"7a92e.svg","left":"calc(50% + 181px)","top":"55.96%","bottom":"43.63%","width":"16px"},{"file":"c1caf.svg","left":"calc(50% + 243.5px)","top":"55.96%","bottom":"43.63%","width":"13px"},{"file":"e22f4.svg","left":"calc(50% + 305.5px)","top":"56.09%","bottom":"43.63%","width":"17px"},{"file":"acf14.svg","left":"calc(50% + 368.5px)","top":"56.09%","bottom":"43.63%","width":"17px"},{"file":"baf86.svg","left":"calc(50% + 430.5px)","top":"56.07%","bottom":"43.63%","width":"17px"},{"file":"4636b.svg","left":"calc(50% + 499px)","top":"55.98%","bottom":"43.63%","width":"16px"},{"file":"1f746.svg","left":"calc(50% + 554px)","top":"55.98%","bottom":"43.63%","width":"16px"},{"file":"12a2b.svg","left":"calc(50% + 617.5px)","top":"56.09%","bottom":"43.63%","width":"17px"},{"file":"9afb2.svg","left":"calc(50% + 679.5px)","top":"56.07%","bottom":"43.63%","width":"17px"},{"file":"c61cc.svg","left":"calc(50% + 741.5px)","top":"56.01%","bottom":"43.63%","width":"17px"},{"file":"84e77.svg","left":"calc(50% + 804px)","top":"56.09%","bottom":"43.63%","width":"18px"},{"file":"4a957.svg","left":"calc(50% + 866.5px)","top":"56.09%","bottom":"43.63%","width":"17px"},{"file":"0314e.svg","left":"calc(50% + 180.5px)","top":"56.92%","bottom":"42.8%","width":"17px"},{"file":"bbe61.svg","left":"calc(50% + 244px)","top":"56.92%","bottom":"42.8%","width":"18px"},{"file":"04982.svg","left":"calc(50% + 305.5px)","top":"56.92%","bottom":"42.7%","width":"17px"},{"file":"5704e.svg","left":"calc(50% + 368.5px)","top":"56.92%","bottom":"42.8%","width":"17px"},{"file":"1afbc.svg","left":"calc(50% + 678.64px)","top":"65.89%","bottom":"33.69%","width":"37.273px"},{"file":"1fb7d.svg","left":"calc(50% + 742.64px)","top":"65.89%","bottom":"33.69%","width":"37.273px"},{"file":"6050a.svg","left":"calc(50% + 803.64px)","top":"65.89%","bottom":"33.69%","width":"37.273px"},{"file":"08c32.svg","left":"calc(50% + 866.4px)","top":"65.89%","bottom":"33.69%","width":"38.794px"},{"file":"3b578.svg","left":"calc(50% + 181.02px)","top":"66.81%","bottom":"32.76%","width":"38.034px"},{"file":"06b93.svg","left":"calc(50% + 244.4px)","top":"66.81%","bottom":"32.76%","width":"38.794px"},{"file":"aa3d6.svg","left":"calc(50% + 306.02px)","top":"66.81%","bottom":"32.76%","width":"38.034px"},{"file":"a80e8.svg","left":"calc(50% + 367.64px)","top":"66.81%","bottom":"32.76%","width":"37.273px"},{"file":"6694e.svg","left":"calc(50% + 430.64px)","top":"66.81%","bottom":"32.76%","width":"37.273px"},{"file":"9f34c.svg","left":"calc(50% + 493.98px)","top":"66.81%","bottom":"32.76%","width":"37.273px"},{"file":"20437.svg","left":"calc(50% + 554.13px)","top":"61.33%","bottom":"38.24%","width":"18.256px"},{"file":"d4983.svg","left":"calc(50% + 617.75px)","top":"61.33%","bottom":"38.24%","width":"17.495px"},{"file":"74717.svg","left":"calc(50% + 679.13px)","top":"61.33%","bottom":"38.24%","width":"18.256px"},{"file":"dda25.svg","left":"calc(50% + 741.75px)","top":"61.33%","bottom":"38.24%","width":"17.495px"},{"file":"368dc.svg","left":"calc(50% + 804.13px)","top":"61.33%","bottom":"38.24%","width":"18.256px"},{"file":"7aa3b.svg","left":"calc(50% + 866.75px)","top":"61.33%","bottom":"38.24%","width":"17.495px"},{"file":"d15a3.svg","left":"calc(50% + 181.13px)","top":"62.23%","bottom":"37.33%","width":"18.256px"},{"file":"e9a04.svg","left":"calc(50% + 243.75px)","top":"62.23%","bottom":"37.33%","width":"17.495px"},{"file":"9b02e.svg","left":"calc(50% + 306.13px)","top":"62.23%","bottom":"37.33%","width":"18.256px"},{"file":"d6b51.svg","left":"calc(50% + 368.13px)","top":"62.23%","bottom":"37.32%","width":"18.256px"},{"file":"3cfae.svg","left":"calc(50% + 430.75px)","top":"56.77%","bottom":"42.8%","width":"17.495px"},{"file":"f0f7c.svg","left":"calc(50% + 493.99px)","top":"56.77%","bottom":"42.81%","width":"15.974px"},{"file":"c31fa.svg","left":"calc(50% + 554.75px)","top":"56.77%","bottom":"42.81%","width":"17.495px"},{"file":"3f3bb.svg","left":"calc(50% + 617.75px)","top":"56.77%","bottom":"42.8%","width":"17.495px"},{"file":"047e4.svg","left":"calc(50% + 679.13px)","top":"56.77%","bottom":"42.81%","width":"18.256px"},{"file":"16e0b.svg","left":"calc(50% + 741.75px)","top":"56.77%","bottom":"42.8%","width":"17.495px"},{"file":"280ea.svg","left":"calc(50% + 803.75px)","top":"56.77%","bottom":"42.8%","width":"17.495px"},{"file":"5baea.svg","left":"calc(50% + 866.37px)","top":"56.77%","bottom":"42.8%","width":"16.735px"},{"file":"fc256.svg","left":"calc(50% + 180.75px)","top":"57.7%","bottom":"41.88%","width":"17.495px"},{"file":"e2984.svg","left":"calc(50% + 244px)","top":"57.7%","bottom":"41.88%","width":"17.495px"}];

function scaleMonosciPage() {
  const scale = window.innerWidth / MONOSCI_DESIGN_WIDTH;
  document.documentElement.style.setProperty("--monosci-scale", scale.toFixed(6));
}

function monosciCellIndex(glyph) {
  const xOffset = Number(glyph.left.match(/\+\s*([\d.]+)px/)?.[1]);
  const top = (Number.parseFloat(glyph.top) / 100) * MONOSCI_SCENE_HEIGHT;
  const bottom = (1 - Number.parseFloat(glyph.bottom) / 100) * MONOSCI_SCENE_HEIGHT;
  const centerY = (top + bottom) / 2;
  const column = Math.round(
    (xOffset - MONOSCI_GRID_FIRST_CENTER_X) / MONOSCI_GRID_CELL_WIDTH,
  );
  const row = Math.round(
    (centerY - MONOSCI_GRID_FIRST_CENTER_Y) / MONOSCI_GRID_CELL_HEIGHT,
  );

  return row * 12 + column;
}

function monosciGlyphMetadata(cellIndex) {
  const styleIndex = Math.floor(cellIndex / MONOSCI_CHARACTERS.length);
  const characterIndex = cellIndex % MONOSCI_CHARACTERS.length;

  return {
    style: MONOSCI_STYLE_KEYS[styleIndex],
    character: MONOSCI_CHARACTERS[characterIndex],
  };
}

function renderMonosciPreview(style, characters) {
  const preview = document.querySelector(".monosci-source-preview");
  const library = window.MONOSCI_SOURCE_LIBRARY;
  const styleGlyphs = library?.styles?.[style];
  if (!preview || !styleGlyphs) return;

  preview.classList.toggle("is-style-round", style === "round");
  preview.classList.toggle("is-style-angular", style === "angular");
  preview.classList.toggle("is-style-extended", style === "extended");
  preview.dataset.previewCharacters = characters.join("");

  const glyphs = characters.map((character) => styleGlyphs[character]).filter(Boolean);
  if (glyphs.length === 0) return;

  const metrics = library.metrics;
  const gap = glyphs.length > 1 ? metrics.unitsPerEm * 0.08 : 0;
  const glyphScales = glyphs.map((glyph, index) => {
    const character = characters[index];
    if (style === "round") {
      const usesAscenderGuide = /^[A-Z0-9]$/.test(character) || glyph.bounds.yMax >= 700;
      return usesAscenderGuide
        ? MONOSCI_EXTENDED_GUIDE_SCALES.ascender
        : MONOSCI_EXTENDED_GUIDE_SCALES.xHeight;
    }
    if (style === "angular") {
      if (/^[A-Z0-9]$/.test(character)) {
        return MONOSCI_ANGULAR_GUIDE_SCALES.capHeight;
      }
      return glyph.bounds.yMax >= 700
        ? MONOSCI_ANGULAR_GUIDE_SCALES.ascender
        : MONOSCI_ANGULAR_GUIDE_SCALES.xHeight;
    }
    if (style !== "extended") return 1;

    const usesAscenderGuide = /^[A-Z0-9]$/.test(character) || glyph.bounds.yMax >= 700;
    return usesAscenderGuide
      ? MONOSCI_EXTENDED_GUIDE_SCALES.ascender
      : MONOSCI_EXTENDED_GUIDE_SCALES.xHeight;
  });
  const widths = glyphs.map(
    (glyph, index) =>
      (glyph.bounds.xMax - glyph.bounds.xMin) * glyphScales[index],
  );
  const totalWidth = widths.reduce((sum, width) => sum + width, 0) + gap;
  const capHeight = metrics.ascender - metrics.baseline;
  const svg = document.createElementNS(MONOSCI_SVG_NAMESPACE, "svg");
  svg.setAttribute("viewBox", `0 0 ${totalWidth} ${capHeight}`);
  svg.setAttribute("preserveAspectRatio", "xMidYMid meet");
  svg.setAttribute("aria-hidden", "true");

  let x = 0;
  glyphs.forEach((glyph, index) => {
    const group = document.createElementNS(MONOSCI_SVG_NAMESPACE, "g");
    const path = document.createElementNS(MONOSCI_SVG_NAMESPACE, "path");
    const glyphScale = glyphScales[index];
    const xTranslation = x - glyph.bounds.xMin * glyphScale;

    group.setAttribute(
      "transform",
      `translate(${xTranslation} ${metrics.ascender}) scale(${glyphScale} ${-glyphScale})`,
    );
    path.setAttribute("d", glyph.path);
    path.setAttribute("fill", "#000");
    path.setAttribute("fill-rule", "nonzero");
    group.append(path);
    svg.append(group);

    x += widths[index] + gap;
  });

  preview.replaceChildren(svg);
  const label = characters.length > 1
    ? `${MONOSCI_STYLE_LABELS[style]} capital ${characters[0]} and lowercase ${characters[1]}`
    : `${MONOSCI_STYLE_LABELS[style]} number ${characters[0]}`;
  preview.setAttribute("aria-label", `Enlarged Monosci ${label}`);
}

function selectMonosciGlyph(style, character) {
  const isLetter = /^[A-Za-z]$/.test(character);
  const characters = isLetter
    ? [character.toUpperCase(), character.toLowerCase()]
    : [character];
  const selectedCharacters = new Set(characters);

  document.querySelectorAll(".monosci-glyph, .monosci-glyph-hit").forEach((element) => {
    const isSelected =
      element.dataset.style === style &&
      selectedCharacters.has(element.dataset.character);
    element.classList.toggle("is-selected", isSelected);
    if (element.classList.contains("monosci-glyph-hit")) {
      element.setAttribute("aria-pressed", String(isSelected));
    }
  });

  renderMonosciPreview(style, characters);
}

function mountMonosciGridLines() {
  const layer = document.querySelector(".monosci-grid-lines");
  if (!layer || layer.childElementCount > 0) return;

  const assetDirectory = "./assets/images/projects/monosci-font/figma-v2";
  const fragment = document.createDocumentFragment();
  const appendLine = (file, modifier, left, top) => {
    const image = document.createElement("img");
    image.src = `${assetDirectory}/${file}`;
    image.alt = "";
    image.decoding = "async";
    image.className = `monosci-grid-line monosci-grid-line--${modifier}`;
    image.style.left = `${left}px`;
    image.style.top = `${top}px`;
    fragment.append(image);
  };

  for (let row = 0; row < 16; row += 1) {
    appendLine("9ad0b.svg", "horizontal", 0, row * MONOSCI_GRID_CELL_HEIGHT);
  }
  appendLine("3f8fa.svg", "horizontal", 0, 16 * MONOSCI_GRID_CELL_HEIGHT);

  for (let column = 0; column <= 12; column += 1) {
    const file = column <= 6 ? "1895d.svg" : "27124.svg";
    appendLine(file, "vertical", column * MONOSCI_GRID_CELL_WIDTH, 0);
  }

  layer.append(fragment);
}

function mountMonosciGlyphs() {
  const layer = document.querySelector(".monosci-glyph-layer");
  const hitLayer = document.querySelector(".monosci-glyph-hit-layer");
  if (!layer || !hitLayer || layer.childElementCount > 0) return;

  const hasLatestLayout = Array.isArray(window.MONOSCI_GLYPHS_LATEST);
  const glyphLayout = hasLatestLayout ? window.MONOSCI_GLYPHS_LATEST : MONOSCI_GLYPHS;
  const assetDirectory = hasLatestLayout
    ? "./assets/images/projects/monosci-font/figma-v2"
    : "./assets/images/projects/monosci-font";
  const fragment = document.createDocumentFragment();

  glyphLayout.forEach((glyph) => {
    const cellIndex = monosciCellIndex(glyph);
    const metadata = monosciGlyphMetadata(cellIndex);
    const wrapper = document.createElement("span");
    wrapper.className = "monosci-glyph";
    wrapper.dataset.cell = String(cellIndex);
    wrapper.dataset.style = metadata.style;
    wrapper.dataset.character = metadata.character;
    wrapper.style.left = glyph.left;
    wrapper.style.top = glyph.top;
    wrapper.style.bottom = glyph.bottom;
    wrapper.style.width = glyph.width;

    const image = document.createElement("img");
    image.src = `${assetDirectory}/${glyph.file}`;
    image.alt = "";
    image.loading = "lazy";
    image.decoding = "async";

    wrapper.append(image);
    fragment.append(wrapper);
  });

  layer.append(fragment);

  const hitFragment = document.createDocumentFragment();
  for (let cellIndex = 0; cellIndex < glyphLayout.length; cellIndex += 1) {
    const metadata = monosciGlyphMetadata(cellIndex);
    const isLetter = /^[A-Za-z]$/.test(metadata.character);
    const button = document.createElement("button");
    const label = isLetter
      ? `${MONOSCI_STYLE_LABELS[metadata.style]} ${metadata.character.toUpperCase()} and ${metadata.character.toLowerCase()}`
      : `${MONOSCI_STYLE_LABELS[metadata.style]} number ${metadata.character}`;

    button.type = "button";
    button.className = "monosci-glyph-hit";
    button.dataset.cell = String(cellIndex);
    button.dataset.style = metadata.style;
    button.dataset.character = metadata.character;
    button.setAttribute("aria-label", label);
    button.setAttribute("aria-pressed", "false");
    button.addEventListener("pointerenter", () => {
      selectMonosciGlyph(metadata.style, metadata.character);
    });
    button.addEventListener("focus", () => {
      selectMonosciGlyph(metadata.style, metadata.character);
    });
    hitFragment.append(button);
  }

  hitLayer.append(hitFragment);
  hitLayer.addEventListener("pointerleave", () => {
    selectMonosciGlyph("angular", "A");
  });
  selectMonosciGlyph("angular", "A");
}

scaleMonosciPage();
mountMonosciGridLines();
mountMonosciGlyphs();
window.addEventListener("resize", scaleMonosciPage, { passive: true });

if (window.gsap) {
  const media = gsap.matchMedia();

  media.add(
    {
      reduceMotion: "(prefers-reduced-motion: reduce)",
      allowMotion: "(prefers-reduced-motion: no-preference)",
    },
    (context) => {
      const { reduceMotion } = context.conditions;
      const revealItems = gsap.utils.toArray("[data-reveal]");
      const comparison = document.querySelector(".monosci-comparison");
      const comparisonOverlays = gsap.utils.toArray(".monosci-comparison-extended");
      const comparisonGuides = gsap.utils.toArray(".monosci-comparison-guides");
      const readinessCleanups = [];

      const whenReady = (item, callback) => {
        const images = Array.from(item.querySelectorAll("img"));
        if (images.length === 0) {
          callback();
          return () => {};
        }

        let cancelled = false;
        let remaining = images.length;
        const cleanups = [];

        const markReady = () => {
          remaining -= 1;
          if (!cancelled && remaining === 0) callback();
        };

        images.forEach((image) => {
          const finish = () => {
            if (typeof image.decode === "function" && image.complete && image.naturalWidth > 0) {
              image.decode().then(markReady).catch(markReady);
            } else {
              markReady();
            }
          };

          if (image.complete) {
            finish();
          } else {
            image.addEventListener("load", finish, { once: true });
            image.addEventListener("error", markReady, { once: true });
            cleanups.push(() => {
              image.removeEventListener("load", finish);
              image.removeEventListener("error", markReady);
            });
          }
        });

        return () => {
          cancelled = true;
          cleanups.forEach((cleanup) => cleanup());
        };
      };

      gsap.set(revealItems, {
        autoAlpha: reduceMotion ? 1 : 0,
        willChange: reduceMotion ? "auto" : "opacity",
      });
      gsap.set(comparisonOverlays, reduceMotion
        ? { clipPath: "inset(0 0 0 0%)", x: 0, willChange: "auto" }
        : { clipPath: "inset(0 0 0 100%)", x: 0, willChange: "clip-path" });
      gsap.set(comparisonGuides, reduceMotion
        ? { clipPath: "inset(0 0 0 0%)", willChange: "auto" }
        : { clipPath: "inset(0 0 0 100%)", willChange: "clip-path" });
      document.documentElement.classList.remove("is-preparing-monosci-media");

      if (reduceMotion) {
        gsap.set(revealItems, { clearProps: "opacity,visibility,willChange" });
        gsap.set(comparisonOverlays, { clearProps: "clipPath,transform,willChange" });
        gsap.set(comparisonGuides, { clearProps: "clipPath,willChange" });
        return undefined;
      }

      const reveal = (item, delay = 0) => {
        readinessCleanups.push(
          whenReady(item, () => {
            gsap.to(item, {
              autoAlpha: 1,
              duration: 1.15,
              delay,
              ease: "power2.out",
              overwrite: "auto",
              clearProps: "opacity,visibility,willChange",
            });
          }),
        );
      };

      let observer;
      let comparisonObserver;
      if ("IntersectionObserver" in window) {
        observer = new IntersectionObserver(
          (entries) => {
            const visibleEntries = entries.filter((entry) => entry.isIntersecting);
            visibleEntries.forEach((entry, index) => {
              reveal(entry.target, index * 0.04);
              observer.unobserve(entry.target);
            });
          },
          {
            threshold: 0.06,
            rootMargin: "0px 0px -4% 0px",
          },
        );

        revealItems.forEach((item) => observer.observe(item));
      } else {
        revealItems.forEach((item, index) => reveal(item, index * 0.025));
      }

      const revealComparison = () => {
        if (!comparison || comparisonOverlays.length === 0) return;
        readinessCleanups.push(
          whenReady(comparison, () => {
            comparisonOverlays.forEach((overlay, index) => {
              const guides = comparisonGuides[index];
              const timeline = gsap.timeline({
                delay: index * 0.16,
                onComplete: () => {
                  gsap.set(overlay, { clearProps: "willChange" });
                  if (guides) {
                    gsap.set(guides, { clearProps: "willChange" });
                  }
                },
              });

              timeline
                .to(overlay, {
                  clipPath: "inset(0 0 0 0%)",
                  duration: 2.3,
                  ease: "power2.in",
                  overwrite: "auto",
                }, 0)
                .to(guides, {
                  clipPath: "inset(0 0 0 0%)",
                  duration: 2.3,
                  ease: "power2.in",
                  overwrite: "auto",
                }, 0.18);
            });
          }),
        );
      };

      if (comparison && "IntersectionObserver" in window) {
        comparisonObserver = new IntersectionObserver(
          (entries) => {
            if (!entries.some((entry) => entry.isIntersecting)) return;
            revealComparison();
            comparisonObserver.disconnect();
          },
          {
            threshold: 0.2,
            rootMargin: "0px 0px -8% 0px",
          },
        );
        comparisonObserver.observe(comparison);
      } else {
        revealComparison();
      }

      return () => {
        observer?.disconnect();
        comparisonObserver?.disconnect();
        readinessCleanups.forEach((cleanup) => cleanup());
        gsap.killTweensOf([
          ...revealItems,
          ...comparisonOverlays,
          ...comparisonGuides,
        ]);
        gsap.set(revealItems, {
          clearProps: "opacity,visibility,willChange",
        });
        gsap.set(comparisonOverlays, {
          clearProps: "clipPath,transform,willChange",
        });
        gsap.set(comparisonGuides, {
          clearProps: "clipPath,willChange",
        });
      };
    },
  );
} else {
  document.documentElement.classList.remove("is-preparing-monosci-media");
}


//Java
import java.io.File;
import java.io.IOException;
import java.io.OutputStream;

//JAXP
import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.TransformerException;
import javax.xml.transform.Source;
import javax.xml.transform.Result;
import javax.xml.transform.stream.StreamSource;
import javax.xml.transform.sax.SAXResult;
import javax.xml.transform.dom.DOMSource;

//UI
import java.awt.BorderLayout;
import java.awt.event.ActionListener;
import java.awt.event.ActionEvent;
import javax.swing.JFrame;
import javax.swing.JPanel;
import javax.swing.JButton;

//FOP
import org.apache.fop.apps.FOUserAgent;
import org.apache.fop.apps.Fop;
import org.apache.fop.apps.FopFactory;
import org.apache.fop.apps.MimeConstants;
import org.apache.fop.apps.FOPException;

//DOM
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;

/**
 * This class demonstrates the conversion of an XML file to PDF using 
 * JAXP (XSLT) and FOP (XSL:FO).
 */
public class XML2PDF {

    public static void convertXML2PDF(File xml, File xslt, File pdf) 
                throws IOException, FOPException, TransformerException, 
                javax.xml.parsers.ParserConfigurationException, org.xml.sax.SAXException {
        
        OutputStream out = null;
        
        try {        
	        // configure fopFactory as desired
	        FopFactory fopFactory = FopFactory.newInstance();
	
	        FOUserAgent foUserAgent = fopFactory.newFOUserAgent();
	        // configure foUserAgent as desired
	
	        //Setup output
	        out = new java.io.BufferedOutputStream(new java.io.FileOutputStream(pdf));

          // Construct fop with desired output format
          Fop fop = fopFactory.newFop(MimeConstants.MIME_PDF, foUserAgent, out);

          //Setup XSLT
          TransformerFactory factory = TransformerFactory.newInstance();
          Transformer transformer = factory.newTransformer(new StreamSource(xslt));
      
          // Resulting SAX events (the generated FO) must be piped through to FOP
          Result res = new SAXResult(fop.getDefaultHandler());

 					javax.xml.parsers.DocumentBuilderFactory dfactory =
                  javax.xml.parsers.DocumentBuilderFactory.newInstance();
					// Use the DocumentBuilderFactory to provide access to a DocumentBuilder.
					javax.xml.parsers.DocumentBuilder dBuilder = dfactory.newDocumentBuilder();
					// Use the DocumentBuilder to parse the XML input.
					org.w3c.dom.Document inDoc = null;
          
          //Setup input for XSLT transformation
          Source src = null;
          
          if(xml.isDirectory())
          {
            String[] fileNames = xml.list();
            java.util.Arrays.sort(fileNames);
            
            inDoc = dBuilder.newDocument();
            Element root = inDoc.createElement("root");
            inDoc.appendChild(root);
            Document tmpDoc = null;
            File file = null;
            
            for(int i = 0; i < fileNames.length; i++)
						{
							file = new File(xml, fileNames[i]);

							System.out.println("Input: XML (" + file + ")");
							
							try {
								tmpDoc = dBuilder.parse(file);
					    	root.appendChild(inDoc.importNode(tmpDoc.getDocumentElement(), true));
							} catch(org.xml.sax.SAXParseException spe) {
								System.err.println(spe.getMessage());
							}
						}
						
						src = new DOMSource(inDoc.getDocumentElement());
					}
					else
          	src = new StreamSource(xml);
      
          //Start XSLT transformation and FOP processing
          transformer.transform(src, res);

        } catch(Exception ex) {
        	System.err.println(ex.getMessage());
        } finally {
          if(out != null)
          	out.close();
          out = null;
        }
    }

		public static void convertXML2PDF()
		{
	    try {
	      System.out.println("FOP XML2PDF\n");
	      System.out.println("Preparing...");
	
	      //Setup directories
	      File baseDir = new File(".");
	
	      //Setup input and output files            
	      File xmlfile = new File(baseDir, "db/contacts");
	      File xsltfile = new File(baseDir, "contact2fo.xsl");
	      File pdffile = new File(baseDir, "contacts.pdf");
	
	      System.out.println("Input: XML (" + xmlfile + ")");
	      System.out.println("Stylesheet: (" + xsltfile + ")");
	      System.out.println("Output: PDF (" + pdffile + ")");
	      System.out.println();
	      System.out.println("Transforming...");
	      
	      convertXML2PDF(xmlfile, xsltfile, pdffile);
	      
	      System.out.println("Success!");
	    } catch (Exception e) {
	        System.err.println(e.getMessage());
	    }
  	}
  	
    public static void main(String[] args) {
			JPanel panel = new JPanel();
			
			final JButton button = new JButton("Generate PDF");
			
			button.addActionListener(new ActionListener() {
				public void actionPerformed(ActionEvent ae) {
		      new Thread(new Runnable() {
		      	public void run() {
							button.setEnabled(false);
							
							convertXML2PDF();
	        		
	        		button.setEnabled(true);
				    }
	      	}).start();
	      }
			});
			panel.add(button);
			
			JFrame frame = new JFrame("XML to PDF using FOP");
			frame.getContentPane().add(panel, BorderLayout.CENTER);
			frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
			frame.setSize(400, 400);
			frame.setVisible(true);
    }
}

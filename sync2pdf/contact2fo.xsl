<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.1" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:fo="http://www.w3.org/1999/XSL/Format" exclude-result-prefixes="fo">
	  <xsl:template match="root">
	    <fo:root xmlns:fo="http://www.w3.org/1999/XSL/Format">
	      <fo:layout-master-set>
	        <fo:simple-page-master master-name="custom" page-height="2in" page-width="3in" margin-top="2mm" margin-left="2mm" margin-bottom="2mm" margin-right="2mm">
	          <fo:region-body/>
	        </fo:simple-page-master>
	      </fo:layout-master-set>
	      <fo:page-sequence master-reference="custom">
	        <fo:flow flow-name="xsl-region-body">
	        	<xsl:for-each select="contact">
	        		<fo:block font-family="sans-serif" font-size="12pt" break-before='page' xsl:use-attribute-sets="name">
						    <fo:block font-weight="bold" space-after="5mm">
							   	<xsl:if test="Title[normalize-space(.) != '']">
										<xsl:value-of select="Title"/>
										<xsl:text> </xsl:text>
							   	</xsl:if>
							   	<xsl:if test="FirstName[normalize-space(.) != '']">
								    <xsl:value-of select="FirstName"/>
								    <xsl:text> </xsl:text>
							   	</xsl:if>
							   	<xsl:if test="LastName[normalize-space(.) != '']">
								    <xsl:value-of select="LastName"/>
								    <xsl:text> </xsl:text>
							   	</xsl:if>
						    </fo:block>
						   	<xsl:if test="JobTitle[normalize-space(.) != '']">
						    	<fo:block>
								    <xsl:value-of select="JobTitle"/>
						    	</fo:block>
						   	</xsl:if>
						    <fo:block>
							   	<xsl:if test="CompanyName[normalize-space(.) != '']">
								    <xsl:value-of select="CompanyName"/>
								    <xsl:if test="BusinessAddressPostalCode[normalize-space(.) != ''] and BusinessAddressState[normalize-space(.) != '']">
								    	<xsl:text>, </xsl:text>
								    </xsl:if>
							   	</xsl:if>
							   	<xsl:if test="BusinessAddressPostalCode[normalize-space(.) != '']">
								   	<xsl:value-of select="BusinessAddressPostalCode"/>
								   	<xsl:text> </xsl:text>
							   	</xsl:if>
							   	<xsl:if test="BusinessAddressState[normalize-space(.) != '']">
								    <xsl:value-of select="BusinessAddressState"/>
								    <xsl:if test="BusinessAddressCountry[normalize-space(.) != '']">
								    	<xsl:text>, </xsl:text>
								    </xsl:if>
							   	</xsl:if>
							   	<xsl:if test="BusinessAddressCountry[normalize-space(.) != '']">
								    <xsl:value-of select="BusinessAddressCountry"/>
							   	</xsl:if>
						    </fo:block>
						    <fo:block>
						    	<fo:table table-layout="fixed" width="70mm">
						    		<fo:table-column column-width="12mm"/>
										<fo:table-column column-width="43mm"/>
							    	<fo:table-body>
										  <xsl:if test="MobileTelephoneNumber[normalize-space(.) != '']">
												<fo:table-row>
												 	<fo:table-cell>
														<fo:block font-style="italic">tel </fo:block>
												  </fo:table-cell>
												  <fo:table-cell>
														<fo:block>
															<xsl:value-of select="MobileTelephoneNumber"/>
														</fo:block>
												  </fo:table-cell>
												</fo:table-row>
									   	</xsl:if>
									   	<xsl:if test="CompanyMainTelephoneNumber[normalize-space(.) != '']">
												<fo:table-row>
													<fo:table-cell>
											    	<fo:block font-style="italic">tel </fo:block>
												  </fo:table-cell>
												  <fo:table-cell>
											    	<fo:block>
												    	<xsl:value-of select="CompanyMainTelephoneNumber"/>
											    	</fo:block>
												  </fo:table-cell>
												</fo:table-row>
									   	</xsl:if>
									   	<xsl:if test="Email1Address[normalize-space(.) != '']">
												<fo:table-row>
												 	<fo:table-cell>
											  		<fo:block font-style="italic">email </fo:block>
												  </fo:table-cell>
												  <fo:table-cell>
											    	<fo:block>
												    	<xsl:value-of select="Email1Address"/>
											    	</fo:block>
												  </fo:table-cell>
												</fo:table-row>
									   	</xsl:if>
									   	<xsl:if test="Email2Address[normalize-space(.) != '']">
												<fo:table-row>
											    <fo:table-cell>
											    	<fo:block font-style="italic">email </fo:block>
												  </fo:table-cell>
											    <fo:table-cell>
												    <fo:block>
													    <xsl:value-of select="Email2Address"/>
												    </fo:block>
											    </fo:table-cell>
												</fo:table-row>
									   	</xsl:if>
									   	<xsl:if test="Email3Address[normalize-space(.) != '']">
												<fo:table-row>
													<fo:table-cell>
												    <fo:block font-style="italic">email </fo:block>
											    </fo:table-cell>
											    <fo:table-cell>
												    <fo:block>
													    <xsl:value-of select="Email3Address"/>
												    </fo:block>
											    </fo:table-cell>
												</fo:table-row>
									   	</xsl:if>
									   	<xsl:if test="WebPage[normalize-space(.) != '']">
												<fo:table-row>
											    <fo:table-cell>
												    <fo:block font-style="italic">url </fo:block>
											    </fo:table-cell>
											    <fo:table-cell>
												    <fo:block>
												    	<xsl:value-of select="WebPage"/>
												    </fo:block>
												 </fo:table-cell>
												</fo:table-row>
									   	</xsl:if>
											<fo:table-row height="1">
											 	<fo:table-cell>
													<fo:block font-size="1"></fo:block>
											  </fo:table-cell>
											  <fo:table-cell>
													<fo:block font-size="1"></fo:block>
											  </fo:table-cell>
											</fo:table-row>
							    	</fo:table-body>
						    	</fo:table>
						    </fo:block>
						  </fo:block> 
					  </xsl:for-each>
	        </fo:flow>
	      </fo:page-sequence>
	    </fo:root>
		</xsl:template>
</xsl:stylesheet>

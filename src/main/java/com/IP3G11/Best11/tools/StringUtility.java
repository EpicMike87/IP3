package com.IP3G11.Best11.tools;

import java.text.Normalizer;

public class StringUtility {

    //Converts non latin characters to latin characters
    public static String convertToStandardChars(String s) {
        s = Normalizer.normalize(s, Normalizer.Form.NFD);
        s = s.replaceAll("\\p{M}", "");
        return s;
    }
}

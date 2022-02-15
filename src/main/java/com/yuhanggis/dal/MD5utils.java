/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.yuhanggis.dal;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

/**
 *
 * @author 我的世界
 */
public class MD5utils {
        public static String getMD5(String plainText) {
        try {
            MessageDigest md = MessageDigest.getInstance("MD5");
            md.update(plainText.getBytes());
            byte b[] = md.digest();
            int i;
            StringBuffer buf = new StringBuffer("");
            for (int offset = 0; offset < b.length; offset++) {
                i = b[offset];
                if (i < 0)
                i += 256;
                if (i < 16)
                buf.append("0");
                buf.append(Integer.toHexString(i));
                }
            return buf.toString();
            } catch (NoSuchAlgorithmException e) {
                e.printStackTrace();
                return null;
            }
    }
}

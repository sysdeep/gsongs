NameVirtualHost nia.comcon.pro:80

<VirtualHost nia.comcon.pro:80>
    ServerAdmin webmaster@comcon.obninsk.com
    ServerName www.nia.comcon.pro

    ErrorLog /var/log/apache2/nia.comcon.pro.error.log
    LogLevel warn

    CustomLog /var/log/apache2/nia.comcon.pro.access.log combined


    ProxyRequests off
    ProxyPreserveHost On
    ProxyVia full

    <Proxy *>
        Order deny,allow
        Allow from all
    </Proxy>

    ProxyPass / http://127.0.0.1:5000/
    ProxyPassReverse / http://127.0.0.1:5000/

</VirtualHost>

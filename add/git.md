# Git settings




    [user]
        name = username
        email = username@mail.com
    
    [alias]
        co = checkout
        ci = commit
        st = status
        br = branch
        hist = log --pretty=format:\"%h %ad | %s%d [%an]\" --graph --date=short
        type = cat-file -t
        dump = cat-file -p
    
    [core]
        quotepath = false 
        pager = cat|more.com
    
    [color]
        ui = auto
    
    [color "branch"]
        current = yellow reverse
        local = yellow
        remote = green
    
    [color "diff"]
        meta = yellow bold
        frag = magenta bold
        old = red bold
        new = green bold
    
    [color "status"]
        added = yellow
        changed = green
        untracked = cyan
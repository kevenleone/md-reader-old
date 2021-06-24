import ClayIcon from "@clayui/icon";

const Bookmark = () => {
  return (
    <div className="tree">
      <ul>
        <li>
          <ClayIcon symbol="folder" /> Project
          <ul>
            <li>
              <ClayIcon symbol="folder" /> Opened Folder <span>- 15kb</span>
              <ul>
                <li>
                  <ClayIcon symbol="folder" /> css
                  <ul>
                    <li>
                      <ClayIcon symbol="code" /> CSS Files <span>- 3kb</span>
                    </li>
                  </ul>
                </li>
                <li>
                  <i className="fa fa-folder"></i> Folder close{" "}
                  <span>- 10kb</span>
                </li>
                <li>
                  <i className="fab fa-html5"></i> index.html
                </li>
                <li>
                  <i className="fa fa-picture-o"></i> favicon.ico
                </li>
              </ul>
            </li>
            <li>
              <i className="fa fa-folder"></i> Folder close <span>- 420kb</span>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
};

export default Bookmark;
